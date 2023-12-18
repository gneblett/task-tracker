from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = [
    {"id": 1, "title": "Task 1"},
    {"id": 2, "title": "Task 2"},
    {"id": 3, "title": "Task 3"},
]

@app.route('/tasks', methods=['DELETE'])
def delete_task():
    try:
        task_id = int(request.args.get('id'))

        task = next((task for task in tasks if task['id'] == task_id), None)
        if task:
            tasks.remove(task)
            return jsonify({'message': 'Task deleted successfully'}), 204  # Use 204 for DELETE success
        else:
            return jsonify({'error': 'Task not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify({"tasks": tasks})

@app.route("/tasks", methods=["POST"])
def add_task():
    try:
        title = request.json.get("title")

        if not title:
            return jsonify({'error': 'Title is required in the request payload'}), 400

        new_task = {"id": len(tasks) + 1, "title": title}
        tasks.append(new_task)

        return jsonify({"task": new_task}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)