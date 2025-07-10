from flask import Flask, request, jsonify
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

latest_data = {'Windows'}

@app.route('/send', methods=['POST'])
def receive_data():
    global latest_data
    latest_data = request.json
    print("Comunicacion recibida", latest_data)
    return {'status': 'Data received'}

@app.route('/receive', methods=['GET'])
def send_data():
    return jsonify(latest_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
