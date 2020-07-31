import os
from base64 import b64decode, b64encode, decodestring
from io import BytesIO
import cv2
import numpy as np
from cloudant import Cloudant, query
from PIL import Image
from com_python import faceRecognition as fr


def facialreg(data):
    #anu
    # USERNAME = 'fab907e3-78f2-4d06-b635-15dad9373575-bluemix'
    # PASSWORD = ''
    # URL = 'https://fab907e3-78f2-4d06-b635-15dad9373575-bluemix.cloudantnosqldb.appdomain.cloud'
    # client = Cloudant(USERNAME, PASSWORD, url=URL)
    USERNAME = 'cad2e34d-a37b-4756-b137-caa6154debec-bluemix'
    PASSWORD = '2885b8b79a7c9febfc6cde175ab5d6391aef7fd54d77772d00ea450173e13113'
    URL = 'https://cad2e34d-a37b-4756-b137-caa6154debec-bluemix:2885b8b79a7c9febfc6cde175ab5d6391aef7fd54d77772d00ea450173e13113@cad2e34d-a37b-4756-b137-caa6154debec-bluemix.cloudantnosqldb.appdomain.cloud'
    client = Cloudant(USERNAME, PASSWORD, url=URL)
    # Connect to the account
    client.connect()
    my_db = client['image']
    file_name = data
    for document in my_db:
        if (document['file_name'] == file_name):
            file = document.get_attachment(file_name, attachment_type='binary')
            img_data=file
            stream = BytesIO(img_data)
            image = Image.open(stream).convert("RGB")
            stream.close()
            # image.show()
            # type1= type(img_data)
            # cv2.putText(test_img1,)
    # image1=image.convert('RGB')
    image.save(file_name)
    # print(type1)
    # print(img_data)
    # image = Image.fromstring('RGB',(220,190),decodestring(img_data))
    # image.save("foo.png")
    # print(test_img1)
    # if test_img1 == 'none':
    #     print("no image is selected")
    # else:
    #     pass
    confidence=0
    label=0
    #This module takes images  stored in diskand performs face recognition
    # test_img=cv2.imread('TestImages/hari.jpg')#test_img path
    test_img = cv2.imread(file_name)
    faces_detected,gray_img=fr.faceDetection(test_img)
    # print("faces_detected:",faces_detected)
    # print("img:",gray_img)
    #Comment belows lines when running this program second time.Since it saves training.yml file in directory
    faces,faceID=fr.labels_for_training_data('trainingImages')
    face_recognizer=fr.train_classifier(faces,faceID)
    face_recognizer.write('trainingData.yml')
    #Uncomment below line for subsequent runs
    # face_recognizer=cv2.face.LBPHFaceRecognizer_create()
    # face_recognizer.read('trainingData.yml')#use this to load training data for subsequent runs
    name={0:"Priyanka",1:"Kangana",2:"Hari",3:"vidyavox"}#creating dictionary containing names for each label
    for face in faces_detected:
        (x,y,w,h)=face
        roi_gray=gray_img[y:y+h,x:x+h]
        label,confidence=face_recognizer.predict(roi_gray)#predicting the label of given image
        # print("confidence:",confidence)
        # print("label:",label)
        fr.draw_rect(test_img,face)
        predicted_name=name[label]
        if(confidence>37):#If confidence more than 37 then don't print predicted face text on screen
            fr.put_text(test_img,predicted_name,x,y)
    # resized_img=cv2.resize(test_img,(1000,1000))
    # cv2.imshow("face dtecetion tutorial",resized_img)
    # cv2.waitKey(0)#Waits indefinitely until a key is pressed
    # #########################
    return confidence,label

