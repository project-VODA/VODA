from flask import Flask, request, jsonify
from flask_cors import CORS

# color classify package
import os

import cv2
from color_recognition_api import color_histogram_feature_extraction
from color_recognition_api import knn_classifier
# import matplotlib.pyplot as plt

# object-detection classify package
import argparse
import io
from PIL import Image
import json
import torch


app = Flask(__name__)
CORS(app)
# CORS(app, supports_credentials=True, origins='*',allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"])
context_path = '/flask'  # 원하는 컨텍스트 경로 설정


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

    # 클러스터링 - 결과 이미지, 초기 중앙값, 오차제곱합 반환
    new_image, center, Val = color_histogram_feature_extraction.kmeansColorCluster(source_image, 112, 1)

    color_histogram_feature_extraction.color_histogram_of_test_image(new_image)
    prediction = knn_classifier.main('training.data', 'test.data')
    print('Detected color is:', prediction)

    return prediction


@app.route(context_path + '/hello')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route(context_path + '/color', methods=['POST'])
def index():  # put application's code here
    if request.method == 'POST':
        try:
            # print('request내용: ', request.files)
            image = request.files['image']
            image.save('temp.jpg')  # Save the uploaded image temporarily
            color_result = classify_color('temp.jpg')
            os.remove('temp.jpg')  # Remove the temporary image
            if color_result == 'red':
                color_result = '빨간색'
            elif color_result == 'yellow':
                color_result = '노란색'
            elif color_result == 'green':
                color_result = '초록색'
            elif color_result == 'orange':
                color_result = '주황색'
            elif color_result == 'white':
                color_result = '흰색'
            elif color_result == 'black':
                color_result = '검정색'
            elif color_result == 'blue':
                color_result = '파란색'
            elif color_result == 'violet':
                color_result = '보라색'
            elif color_result == 'apricot':
                color_result = '살구색'
            elif color_result == 'brown':
                color_result = '갈색'
            elif color_result == 'pink':
                color_result = '분홍색'

            return jsonify({'color': color_result})
        except Exception as e:
            return jsonify({'error': str(e)})
    else:
        return jsonify({'error': '올바르지 않은 요청입니다.'})



@app.route(context_path + '/cosmetics', methods=['POST'])
def detect_cosmetics():  # put application's code here
    if request.method == 'POST':
        try:
            image = request.files['image']
            image_bytes = image.read()
            img  = Image.open(io.BytesIO(image_bytes))
            results = model(img, size=640)
            # print('model results: ', type(results), results)
            results_box = model([img])
            results_box.render()
            
            # 박스 쳐진 이미지 result.jpg로 저장
            Image.fromarray(results_box.ims[0]).save('result.jpg')

            # confidence 값이 0.5 이상인 객체들만 추출
            confident_objects = [obj for obj in results.pandas().xyxy[0].to_dict(orient="records") if obj['confidence'] >= 0.5]

            # object_results = results.pandas().xyxy[0].to_json(orient="records")
            # print('object results: ', object_results)

            print('object results: ', confident_objects)
            return jsonify({'objects': confident_objects})      # object_results

        # 객체된 물체 없을 경우, 인덱스 에러가 발생하면 빈 배열
        except IndexError:
            return jsonify({'objects': []})

        except Exception as e:
            return jsonify({'error': str(e)})
    else:
        return jsonify({'error': '올바르지 않은 요청입니다.'})


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Flask api exposing yolov5 model")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    parser.add_argument('--model', default='yolov5s', help='model to run, i.e. --model yolov5s')
    args = parser.parse_args()

    model = torch.hub.load('ultralytics/yolov5', args.model)
    app.run(port=args.port, host="0.0.0.0")
