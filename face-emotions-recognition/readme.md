# 사람 표정 인식(Face-Emotions-Recognition)

[출처](https://github.com/omar-aymen/Emotion-recognition)


## Table of Content :

1. [Description](#p1)

2. [Setting](#p2)

3. [Usage](#p3)

<a id="p1"></a>

## Description

Our Human face is having a mixed emotions so we are to demonstrate the probabilities of these emotions that we have.

### What does Emotion Recognition mean?

Emotion recognition is a technique used in software that allows a program to "read" the emotions on a human face using advanced image processing. Companies have been experimenting with combining sophisticated algorithms with image processing techniques that have emerged in the past ten years to understand more about what an image or a video of a person's face tells us about how he/she is feeling and not just that but also showing the probabilities of mixed emotions a face could has.

<a id="p2"></a>

## Setting  
: Install dependencies using requirements.txt

```shell
pip install -r requirements.txt
```


<a id="p3"></a> 

## Usage:

The program will creat a window to display the scene capture by webcamera and a window representing the probabilities of detected emotions.

```shell
python real_time_video.py
```

You can just use this with the provided pretrained model i have included in the path written in the code file, i have choosen this specificaly since it scores the best accuracy, feel free to choose any but in this case you have to perform and classify the test model