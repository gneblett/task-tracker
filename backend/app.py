from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes of this Flask app

# Sample data
boards = [
    {
        "id": 1,
        "title": "Project Management",
        "groups": [
            {
                "id": 11,
                "title": "To Do",
                "tasks": [
                    {"id": 111, "title": "Create project plan", "priority": "High", "status": "Pending"},
                    {"id": 112, "title": "Define project scope", "priority": "Medium", "status": "In Progress"},
                    {"id": 113, "title": "Gather team feedback", "priority": "Low", "status": "Completed"}
                ]
            },
            {
                "id": 12,
                "title": "In Progress",
                "tasks": [
                    {"id": 121, "title": "Develop prototype", "priority": "High", "status": "In Progress"},
                    {"id": 122, "title": "Conduct stakeholder meetings", "priority": "Medium", "status": "In Progress"}
                ]
            },
            {
                "id": 13,
                "title": "Completed",
                "tasks": [
                    {"id": 131, "title": "Launch project", "priority": "High", "status": "Completed"},
                    {"id": 132, "title": "Finalize documentation", "priority": "Low", "status": "Completed"}
                ]
            }
        ]
    },
    {
        "id": 2,
        "title": "Bug Tracking",
        "groups": [
            {
                "id": 21,
                "title": "Open Bugs",
                "tasks": [
                    {"id": 211, "title": "Fix critical security bug", "priority": "High", "status": "Pending"},
                    {"id": 212, "title": "Address UI glitch", "priority": "Medium", "status": "In Progress"}
                ]
            },
            {
                "id": 22,
                "title": "Resolved Bugs",
                "tasks": [
                    {"id": 221, "title": "Verify and close resolved bugs", "priority": "Low", "status": "Completed"}
                ]
            }
        ]
    }
]

# Route to get all boards
@app.route('/boards', methods=['GET'])
def get_boards():
    return jsonify({'boards': boards})

# Route to add a new board
@app.route('/boards', methods=['POST'])
def add_board():
    data = request.get_json()
    new_board = {
        "id": len(boards) + 1,
        "title": data.get('title', ''),
        "groups": []  # Initialize with an empty list of groups
    }
    boards.append(new_board)
    return jsonify({'message': 'Board added successfully', 'board': new_board}), 201

@app.route('/boards/<string:board_name>/groups/<string:group_name>/tasks', methods=['POST'])
def add_task(board_name, group_name):
    data = request.get_json()
    board = next((board for board in boards if board['title'] == board_name), None)

    if board:
        group = next((group for group in board['groups'] if group['title'] == group_name), None)
        if group:
            new_task = {
                "id": len(group['tasks']) + 1,
                "title": data.get('title', ''),
                "priority": data.get('priority', ''),
                "status": data.get('status', 'Pending')
            }
            group['tasks'].append(new_task)
            return jsonify({'message': 'Task added successfully', 'task': new_task}), 201
        else:
            return jsonify({'error': 'Group not found'}), 404
    else:
        return jsonify({'error': 'Board not found'}), 404

# Route to get groups of a specific board by name
@app.route('/boards/<string:board_name>/groups', methods=['GET'])
def get_groups_by_name(board_name):
    board = next((board for board in boards if board['title'] == board_name), None)
    if board:
        return jsonify({'groups': board['groups']})
    else:
        return jsonify({'error': 'Board not found'}), 404

# Route to get tasks of a specific group by name
@app.route('/groups/<string:group_name>/tasks', methods=['GET'])
def get_tasks_by_group(group_name):
    for board in boards:
        for group in board['groups']:
            if group['title'] == group_name:
                return jsonify({'tasks': group['tasks']})
    return jsonify({'error': 'Group not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)