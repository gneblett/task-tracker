from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes of this Flask app

# Sample data
boards = [
    {
        "id": 1,
        "title": "Board 1",
        "groups": [
            {
                "id": 11,
                "title": "Group 1",
                "tasks": [
                    {"id": 111, "title": "Task 1", "priority": "High", "status": "Pending"},
                    {"id": 112, "title": "Task 2", "priority": "Medium", "status": "Completed"},
                ],
            },
            {
                "id": 12,
                "title": "Group 2",
                "tasks": [
                    {"id": 113, "title": "Task 3", "priority": "Low", "status": "Pending"},
                    {"id": 114, "title": "Task 4", "priority": "High", "status": "In Progress"},
                ],
            },
        ],
    },
        {
        "id": 2,
        "title": "Board 2",
        "groups": [
            {
                "id": 21,
                "title": "Group 1",
                "tasks": [
                    {"id": 211, "title": "Task 1", "priority": "High", "status": "Pending"},
                    {"id": 212, "title": "Task 2", "priority": "Medium", "status": "Completed"},
                ],
            },
            {
                "id": 22,
                "title": "Group 2",
                "tasks": [
                    {"id": 223, "title": "Task 3", "priority": "Low", "status": "Pending"},
                    {"id": 224, "title": "Task 4", "priority": "High", "status": "In Progress"},
                ],
            },
        ],
    },

]

# Route to get all boards
@app.route('/boards', methods=['GET'])
def get_boards():
    return jsonify({'boards': boards})

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