#!/usr/bin/env python3
"""Commit and push website files after they are saved in VS Code."""

from __future__ import annotations

import subprocess
import time
from pathlib import Path
from typing import Optional


ROOT = Path(__file__).resolve().parent.parent
WATCHED_FILES = (
    ROOT / "team-handoff/index.html",
    ROOT / "team-handoff/styles.css",
    ROOT / "team-handoff/vistrx-logo.jpg",
    ROOT / "public/video/holography.mp4",
    ROOT / "public/video/holography-game.mp4",
)
DEBOUNCE_SECONDS = 2
RETRY_SECONDS = 30


def git(*args: str, check: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=ROOT,
        check=check,
        text=True,
        capture_output=True,
    )


def has_changes() -> bool:
    relative_files = [
        str(path.relative_to(ROOT))
        for path in WATCHED_FILES
        if path.exists()
    ]
    result = git("status", "--porcelain", "--", *relative_files)
    return bool(result.stdout.strip())


def commit_changes() -> bool:
    if not has_changes():
        return False

    relative_files = [
        str(path.relative_to(ROOT))
        for path in WATCHED_FILES
        if path.exists()
    ]
    git("add", "--", *relative_files)
    message = f"Update website ({time.strftime('%Y-%m-%d %H:%M:%S')})"
    result = git("commit", "-m", message, check=False)
    if result.returncode:
        print(f"[auto-publish] Commit failed: {result.stderr.strip()}", flush=True)
        return False

    print("[auto-publish] Saved website changes and created a commit.", flush=True)
    return True


def push_changes() -> bool:
    result = git("push", "origin", "main", check=False)
    if result.returncode:
        print(f"[auto-publish] GitHub push failed: {result.stderr.strip()}", flush=True)
        print("[auto-publish] Will retry the push every 30 seconds.", flush=True)
        return False

    print("[auto-publish] GitHub updated. Cloudflare will deploy automatically.", flush=True)
    return True


def mtimes() -> dict[Path, int]:
    return {path: path.stat().st_mtime_ns for path in WATCHED_FILES if path.exists()}


def main() -> None:
    previous_mtimes = mtimes()
    pending_since: Optional[float] = time.monotonic() if has_changes() else None
    next_push_retry: Optional[float] = None

    print("[auto-publish] Watching HTML/CSS/logo and public/video files.", flush=True)
    print("[auto-publish] Every saved change will be committed and pushed to main.", flush=True)
    if pending_since is not None:
        print("[auto-publish] Existing website changes detected; publishing them now.", flush=True)

    while True:
        current_mtimes = mtimes()
        if current_mtimes != previous_mtimes:
            previous_mtimes = current_mtimes
            pending_since = time.monotonic()

        if pending_since is not None and time.monotonic() - pending_since >= DEBOUNCE_SECONDS:
            if commit_changes():
                if not push_changes():
                    next_push_retry = time.monotonic() + RETRY_SECONDS
                else:
                    next_push_retry = None
            pending_since = None

        if next_push_retry is not None and time.monotonic() >= next_push_retry:
            if push_changes():
                next_push_retry = None
            else:
                next_push_retry = time.monotonic() + RETRY_SECONDS

        time.sleep(1)


if __name__ == "__main__":
    main()
