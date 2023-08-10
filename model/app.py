from flask import Flask, request, jsonify
from flask_cors import CORS

# color classify package
import os
import cv2
from color_recognition_api import color_histogram_feature_extraction
from color_recognition_api import knn_classifier

app = Flask(__name__)
CORS(app)

PATH = 'training.data'

if os.path.isfile(PATH) and os.access(PATH, os.R_OK):
    print ('training data is ready, classifier is loading...')
else:
    print ('training data is being created...')
    open('training.data', 'w')
    color_histogram_feature_extraction.training()
    print ('training data is ready, classifier is loading...')

# Color classification function
def classify_color(image_path):
    source_image = cv2.imread(image_path)
    # source_image = cv2.imread('black_cat.jpg')
    color_histogram_feature_extraction.color_histogram_of_test_image(source_image)
    prediction = knn_classifier.main('training.data', 'test.data')
    print('Detected color is:', prediction)
    return prediction


@app.route('/hello')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/color', methods=['POST'])
def index():  # put application's code here
    if request.method == 'POST':
        try:
            # print('request내용: ', request.files)
            image = request.files['image']
            image.save('temp.jpg')  # Save the uploaded image temporarily
            color_result = classify_color('temp.jpg')
            os.remove('temp.jpg')  # Remove the temporary image
            return jsonify({'color': color_result})
        except Exception as e:
            return jsonify({'error': str(e)})
    else:
        return jsonify({'error': '올바르지 않은 요청입니다.'})

if __name__ == '__main__':
    app.run()
