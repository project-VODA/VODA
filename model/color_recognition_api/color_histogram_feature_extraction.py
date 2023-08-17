#!/usr/bin/python
# -*- coding: utf-8 -*-
# ----------------------------------------------
# --- Author         : Ahmet Ozlu
# --- Mail           : ahmetozlu93@gmail.com
# --- Date           : 31st December 2017 - new year eve :)
# ----------------------------------------------

# from PIL import Image
import os
import cv2
import numpy as np
# import matplotlib.pyplot as plt
# from scipy.stats import itemfreq
# from color_recognition_api import knn_classifier as knn_classifier


def kmeansColorCluster(image, clusters, rounds):
    height, width = image.shape[:2]
    samples = np.zeros([ height * width, 3 ], dtype=np.float32)

    count = 0
    for x in range(height):
        for y in range(width):
            samples[count] = image[x][y]
            count += 1

    compactness, labels, centers = cv2.kmeans(
        samples, # 비지도 학습 데이터 정렬
        clusters, # 군집화 개수
        None, # 각 샘플의 군집 번호 정렬
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 
                    10000, # max_iter 
                    0.0001), # epsilon 
        attempts = rounds, 
        flags = cv2.KMEANS_PP_CENTERS
    )
    
    centers = np.uint8(centers)
    res = centers[labels.flatten()]
    
    return res.reshape((image.shape)), centers, round(compactness, 4)


def color_histogram_of_test_image(test_src_image):

    # load the image
    image = test_src_image

    channels = cv2.split(image)     # 색상 분리
    # print('BGR 색 평면 분할: ', channels)
    colors = ('b', 'g', 'r')
    # 추출된 히스토그램 값을 저장하기 위한 features
    features = []
    feature_data = ''
    counter = 0
    for (channel, color) in zip(channels, colors):
        counter = counter + 1

        # calcHist 인자는 모두 리스트 형태
        # image- 분석 채널(x축 대상), channels- 분석채널 대상(x축),
        # mask- 분석영역(None이면 전체),histSize-BINS 값(간격), ranges- [0, 256]
        hist = cv2.calcHist([channel], [0], None, [256], [0, 256])
        features.extend(hist)

        # print(type(hist))
        # plt.plot(hist)
        # plt.show()

        # find the peak pixel values for R, G, and B
        # 채널별 peak값 변수에 저장, 모든 결과를 test.data 에 저장
        elem = np.argmax(hist)

        if counter == 1:
            blue = str(elem)
        elif counter == 2:
            green = str(elem)
        elif counter == 3:
            red = str(elem)
            feature_data = red + ',' + green + ',' + blue
            # print(feature_data)

    with open('test.data', 'w') as myfile:
        myfile.write(feature_data)


def color_histogram_of_training_image(img_name):

    # detect image color by using image file name to label training data
    if 'red' in img_name:
        data_source = 'red'
    elif 'yellow' in img_name:
        data_source = 'yellow'
    elif 'green' in img_name:
        data_source = 'green'
    elif 'orange' in img_name:
        data_source = 'orange'
    elif 'white' in img_name:
        data_source = 'white'
    elif 'black' in img_name:
        data_source = 'black'
    elif 'blue' in img_name:
        data_source = 'blue'
    elif 'violet' in img_name:
        data_source = 'violet'
    # 추가 데이터
    elif 'apricot' in img_name:
        data_source = 'apricot'
    elif 'brown' in img_name:
        data_source = 'brown'
    elif 'pink' in img_name:
        data_source = 'pink'

    # load the image
    image = cv2.imread(img_name)

    # image 에 대한 채널 분리 - 아마 영역별 bgr 값
    channels = cv2.split(image)
    colors = ('b', 'g', 'r')
    features = []
    feature_data = ''
    counter = 0
    for (channel, color) in zip(channels, colors):
        counter = counter + 1

        hist = cv2.calcHist([channel], [0], None, [256], [0, 256])
        features.extend(hist)

        # find the peak pixel values for R, G, and B
        elem = np.argmax(hist)

        if counter == 1:
            blue = str(elem)
        elif counter == 2:
            green = str(elem)
        elif counter == 3:
            red = str(elem)
            feature_data = red + ',' + green + ',' + blue

    with open('training.data', 'a') as myfile:
        myfile.write(feature_data + ',' + data_source + '\n')


def training():

    # red color training images
    for f in os.listdir('./training_dataset/red'):
        color_histogram_of_training_image('./training_dataset/red/' + f)

    # yellow color training images
    for f in os.listdir('./training_dataset/yellow'):
        color_histogram_of_training_image('./training_dataset/yellow/' + f)

    # green color training images
    for f in os.listdir('./training_dataset/green'):
        color_histogram_of_training_image('./training_dataset/green/' + f)

    # orange color training images
    for f in os.listdir('./training_dataset/orange'):
        color_histogram_of_training_image('./training_dataset/orange/' + f)

    # white color training images
    for f in os.listdir('./training_dataset/white'):
        color_histogram_of_training_image('./training_dataset/white/' + f)

    # black color training images
    for f in os.listdir('./training_dataset/black'):
        color_histogram_of_training_image('./training_dataset/black/' + f)

    # blue color training images
    for f in os.listdir('./training_dataset/blue'):
        color_histogram_of_training_image('./training_dataset/blue/' + f)

    # violet color training images
    for f in os.listdir('./training_dataset/violet'):
        color_histogram_of_training_image('./training_dataset/violet/' + f)		

    # apricot color training images - 살색
    for f in os.listdir('./training_dataset/apricot'):
        color_histogram_of_training_image('./training_dataset/apricot/' + f)

    # brown color training images
    for f in os.listdir('./training_dataset/brown'):
        color_histogram_of_training_image('./training_dataset/brown/' + f)

    # pink color training images
    for f in os.listdir('./training_dataset/pink'):
        color_histogram_of_training_image('./training_dataset/pink/' + f)
