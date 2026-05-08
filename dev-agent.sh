#!/bin/bash

SESSION_NAME="dev-sessions"
PROJECT_A="${1:-/home/acostacortez/projects/app}"
PROJECT_B="${2:-/home/acostacortez/projects/cg}"

PORT_A=3000
PORT_B=3001

tmux kill-session -t "$SESSION_NAME" 2>/dev/null

tmux new-session -d -s "$SESSION_NAME" -n "dev"
tmux send-keys -t "$SESSION_NAME:dev" "cd $PROJECT_A && pnpm i && pnpm dev" C-m

tmux split-window -h -t "$SESSION_NAME:dev"
tmux send-keys -t "$SESSION_NAME:dev.1" "cd $PROJECT_B && pnpm i && pnpm dev" C-m

tmux select-pane -t "$SESSION_NAME:dev.0"

echo "Starting tmux session '$SESSION_NAME' with:"
echo "  - Project A: $PROJECT_A (port $PORT_A)"
echo "  - Project B: $PROJECT_B (port $PORT_B)"
echo ""
echo "To attach: tmux attach-session -t $SESSION_NAME"