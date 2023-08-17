# 기반이 될 이미지 선택 (예: Python 3.8 이미지 사용)
FROM python:3.11

# Install required packages, including libgl1-mesa-glx
RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx

# 작업 디렉토리 설정
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# 필요한 Python 패키지 설치
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# 컨테이너 내부에서 듣게 될 포트 설정
EXPOSE 5000

# Flask 애플리케이션을 실행하기 위한 커맨드 설정
CMD ["python", "app.py"]