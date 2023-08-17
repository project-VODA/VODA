from flask import Flask, request, jsonify
from flask_cors import CORS

# color classify package
import os
import cv2
from color_recognition_api import color_histogram_feature_extraction
from color_recognition_api import knn_classifier
# import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)
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

    ######################################################################### 
    # 클러스터링 결과에 대한 이미지 비교
    ######################################################################### 
    # channels_original = cv2.split(source_image)
    # channels_segmented = cv2.split(new_image)

    # # Plot original and segmented images with histograms
    # plt.figure(figsize=(12, 8))

    # plt.subplot(2, 2, 1)
    # plt.imshow(cv2.cvtColor(source_image, cv2.COLOR_BGR2RGB))
    # plt.title("Original Image")

    # plt.subplot(2, 2, 2)
    # plt.imshow(cv2.cvtColor(new_image, cv2.COLOR_BGR2RGB))
    # plt.title("Segmented Image")

    # plt.subplot(2, 2, 3)
    # for channel in channels_original:
    #     plt.plot(cv2.calcHist([channel], [0], None, [256], [0, 256]))
    # plt.title("Original Histogram")

    # plt.subplot(2, 2, 4)
    # for channel in channels_segmented:
    #     plt.plot(cv2.calcHist([channel], [0], None, [256], [0, 256]))
    # plt.title("Segmented Histogram")

    # plt.tight_layout()
    # plt.show()

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

if __name__ == '__main__':
    app.run(port=5000, host="0.0.0.0")
