# 이미지 전처리 위한 모듈
from keras.preprocessing.image import img_to_array
# 영상 처리 위한 모듈, opencv 확장 패키지
# https://github.com/PyImageSearch/imutils - 패키지 공식 깃헙
import imutils
# opencv
import cv2
# 사전 학습된 모델 로드하는 함수
from keras.models import load_model
# 다차원 배열 연산 패키지
import numpy as np

# parameters for loading data and images
# 얼굴 감지 모델 경로
detection_model_path = 'haarcascade_files/haarcascade_frontalface_default.xml'
# 표정 인식 모델 경로
emotion_model_path = 'models/_mini_XCEPTION.102-0.66.hdf5'

# hyper-parameters for bounding boxes shape
# loading models
face_detection = cv2.CascadeClassifier(detection_model_path)
# 이미 학습된 모델 파일을 로드하고 메모리에 모델 객체(objects)를 생성하여 할당
emotion_classifier = load_model(emotion_model_path, compile=False)
EMOTIONS = ["angry" ,"disgust","scared", "happy", "sad", "surprised", "neutral"]


#feelings_faces = []
#for index, emotion in enumerate(EMOTIONS):
   # feelings_faces.append(cv2.imread('emojis/' + emotion + '.png', -1))

# starting video streaming - 해당 이름으로 카메라 켜기
cv2.namedWindow('your_face')
# cv2.VideoCapture(index)로 카메라의 장치 번호(ID)와 연결. index는 카메라의 장치 번호를 의미.
# 노트북 장치 카메라 번호는 일반적으로 0, 외장 카메라 이용할 경우 1~n
camera = cv2.VideoCapture(0)
while True:
    # camera.read - 카메라의 상태 및 프레임 반환; ret, frame
    # ret: 카메라 작동 상태(정상 작동 - True 반환), frame: 
    frame = camera.read()[1]
    # reading the frame - w/h(aspect_ratio, 종횡비)를 계산하여 왜곡되지 않도록.
    frame = imutils.resize(frame, width=300)
    # cvtColor(소스값, 옵션값, dst, dstCn), 옵션값 - gray 로
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # 얼굴 인식 - Rect(x, y, w, h) 로 반환
    faces = face_detection.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30,30), flags=cv2.CASCADE_SCALE_IMAGE)
    # 0으로 된 배열 (높이, 너비, 채널-차원), dtype=8비트 부호 없는 정수
    canvas = np.zeros((250, 300, 3), dtype="uint8")
    frameClone = frame.copy()
    if len(faces) > 0:
        # 얼굴 영역 중 가장 큰 부분을 뽑아내기
        faces = sorted(faces, reverse=True,
        key=lambda x: (x[2] - x[0]) * (x[3] - x[1]))[0]
        (fX, fY, fW, fH) = faces
        # Extract the ROI of the face from the grayscale image, resize it to a fixed 28x28 pixels, and then prepare
        # the ROI for classification via the CNN
        roi = gray[fY:fY + fH, fX:fX + fW]
        # 64 * 64 size 로 조정, 모델 입력 크기로 맞게.
        roi = cv2.resize(roi, (64, 64))
        # 부동 소수점 형태로 변환하고, 0에서 1 사이의 값으로 정규화.
        # 이를 통해 모델이 입력으로 받는 범위에 맞게 데이터를 조정.
        roi = roi.astype("float") / 255.0
        # 이미지를 NumPy 배열로 변환
        roi = img_to_array(roi)
        # expand_dims(input_array, axis) - 차원 추가. axis=0은 []만
        roi = np.expand_dims(roi, axis=0)
        
        # emotion_classifier: 로드된 사전 학습된 표정 인식 모델 객체
        # roi: 전처리된 얼굴 영역, 모델에 입력되는 이미지-배열
        
        # emotion_classifier 모델을 사용하여 roi를 입력으로 받고, 각 표정 클래스에 대한 예측 확률을 반환
        preds = emotion_classifier.predict(roi)[0]
        # 단일 array 내 최댓값 함수(np.max)
        emotion_probability = np.max(preds)
        print(emotion_probability)
        # emotion_probability 가 가장 큰 인덱스 불러오기
        label = EMOTIONS[preds.argmax()]
    else: continue


    # 7가지 감정과 확률 모델 순환
    for (i, (emotion, prob)) in enumerate(zip(EMOTIONS, preds)):
        # construct the label text
        text = "{}: {:.2f}%".format(emotion, prob * 100)

        # draw the label + probability bar on the canvas
        # emoji_face = feelings_faces[np.argmax(preds)]

        
        # 데이터 바탕으로 그림 그려주는 부분
        w = int(prob * 300)     # canvas 너비만큼 확장
        # cv2.rectangle(팔레트, 좌상단 좌표, 우하단 좌표, 색상, 선 굵기(-1은 색칠))
        cv2.rectangle(canvas, (7, (i * 35) + 5),
            (w, (i * 35) + 35), (0, 0, 255), -1)
        cv2.putText(canvas, text, (10, (i * 35) + 23),
            cv2.FONT_HERSHEY_SIMPLEX, 0.45,
            (255, 255, 255), 2)
        cv2.putText(frameClone, label, (fX, fY - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 0, 255), 2)
        cv2.rectangle(frameClone, (fX, fY), (fX + fW, fY + fH),
            (0, 0, 255), 2)
#    for c in range(0, 3):
#        frame[200:320, 10:130, c] = emoji_face[:, :, c] * \
#        (emoji_face[:, :, 3] / 255.0) + frame[200:320,
#        10:130, c] * (1.0 - emoji_face[:, :, 3] / 255.0)


    cv2.imshow('your_face', frameClone)
    cv2.imshow("Probabilities", canvas)
    # cv2.waitKey(delay)
    # delay 만큼 기다렸다가 눌린 키에 대응하는 값을 반환. 입력 없다면 -1 반환
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 카메라 장치에서 받아온 메모리 해제
camera.release()
# 모든 윈도우창을 닫을 때. 모든 작업이 끝났을 경우 사용합니다.(cf- destroyWindow(window_name))
cv2.destroyAllWindows()
