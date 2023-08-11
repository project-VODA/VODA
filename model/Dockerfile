# 기반이 될 이미지 선택 (예: Python 3.8 이미지 사용)
FROM python:3.11

# 작업 디렉토리 설정
WORKDIR /app

# 호스트의 현재 디렉토리의 모든 파일을 컨테이너의 작업 디렉토리로 복사
COPY . /app

# 필요한 Python 패키지 설치
RUN pip install -r requirements.txt

# Flask 애플리케이션을 실행하기 위한 커맨드 설정
CMD ["python", "app.py"]

# 컨테이너 내부에서 듣게 될 포트 설정
EXPOSE 5000