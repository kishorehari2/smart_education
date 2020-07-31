import os
from cloudant import Cloudant, query
from base64 import b64decode, b64encode, decodestring
from io import BytesIO
from PIL import Image
import cv2
import numpy as np
import faceRecognition as fr
import sys

USERNAME = 'cad2e34d-a37b-4756-b137-caa6154debec-bluemix'
PASSWORD = '2885b8b79a7c9febfc6cde175ab5d6391aef7fd54d77772d00ea450173e13113'
URL = 'https://cad2e34d-a37b-4756-b137-caa6154debec-bluemix:2885b8b79a7c9febfc6cde175ab5d6391aef7fd54d77772d00ea450173e13113@cad2e34d-a37b-4756-b137-caa6154debec-bluemix.cloudantnosqldb.appdomain.cloud'
ACCOUNT_NAME='fab907e3-78f2-4d06-b635-15dad9373575-bluemix'
APIKEY='9pVwSZ47r8CHuRyEUOJrtyXas1sdQ-nKZ1O0pxaHL_R3'
#client = Cloudant(USERNAME, PASSWORD, url=URL)
client=Cloudant.iam(ACCOUNT_NAME,APIKEY,connect=True)
# Connect to the account
client.connect()

my_db = client['testdb']
fileId= sys.argv[1]
file_name = fileId #get the id here

for document in my_db:
    if (document['_id'] == file_name): #get id and compare
        print(document)
        file = document.get_attachment("anu.png", attachment_type='binary')
        img_data=file
        stream = BytesIO(img_data)
        image = Image.open(stream).convert("RGB")
        stream.close()
image.save("anu.png")

confidence=0
label=0

print(fileId)
#This module takes images  stored in diskand performs face recognition
# test_img=cv2.imread('TestImages/hari.jpg')#test_img path

test_img = cv2.imread('anu.png')
faces_detected,gray_img=fr.faceDetection(test_img)
# print("faces_detected:",faces_detected)
# print("img:",gray_img)
#Comment belows lines when running this program second time.Since it saves training.yml file in directory
#faces,faceID=fr.labels_for_training_data('trainingImages')
#face_recognizer=fr.train_classifier(faces,faceID)
#face_recognizer.write('trainingData.yml')
#Uncomment below line for subsequent runs
face_recognizer=cv2.face.LBPHFaceRecognizer_create()
face_recognizer.read('trainingData.yml')#use this to load training data for subsequent runs
name={0:"Priyanka",2:"Hari",3:"vidyavox", 4: "anu"}#creating dictionary containing names for each label
for face in faces_detected:
    print('in')
    (x,y,w,h)=face
    roi_gray=gray_img[y:y+h,x:x+h]
    label,confidence=face_recognizer.predict(roi_gray)#predicting the label of given image
    print("confidence:",confidence)
    print("label:",label)
    fr.draw_rect(test_img,face)
    predicted_name=name[label]
    
    if(confidence>37):#If confidence more than 37 then don't print predicted face text on screen
        fr.put_text(test_img,predicted_name,x,y)
# resized_img=cv2.resize(test_img,(1000,1000))
# cv2.imshow("face dtecetion tutorial",resized_img)
# cv2.waitKey(0)#Waits indefinitely until a key is pressed
# #########################
  
