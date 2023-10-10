# Audio-signature
[![YouTube Video](https://img.youtube.com/vi/w-AHgb_e0kI/0.jpg)](https://www.youtube.com/watch?v=w-AHgb_e0kI)
# [`website`](https://home-tau-cyan.vercel.app/) [`Devpost`](https://devpost.com/software/signwave) [`Demo`](https://youtu.be/w-AHgb_e0kI)
submission for dropbox hackathon

# How it works
![QR](https://github.com/jashwanth0712/Audio-signature/blob/main/website/src/assets/getQr.png?raw=true)
## Inspiration
we have many times observed that pen paper much bettergned that electronic signatures, there are various factors like lack of correct device , small screen , inaccurate finger movement and many more 
## What it does
with signwave you can now use your audio as a signature , just tell `I agree` and a customized encrypted qr is generated which will be used for signing , advantage of the audio is you can anytime use the audio to validate the person 
### Feautres 
![gif](https://github.com/jashwanth0712/Audio-signature/blob/main/landingpage/assets/listening_animation.gif?raw=true)
- Creating and injecting audio QR 
- Validating the Audio signed 
- User can just click `ctrl`+`shift`+`s` to open Vocie based assistant that can perform multiple tasks
⭐ Lets see in detail

## How we built it
###  Audio signature
![QR](https://github.com/jashwanth0712/Audio-signature/blob/main/website/src/assets/getQr.png?raw=true)
- We have used `AWS S3` and `AI` to detect similarity in voices and store them securely with encryption
- the recorded voice is uploaded into s3 as well as embedded into the PDFand QR is generated to point towards the audio.
- As a result person can view the audio sign even offline.
![compare](https://github.com/jashwanth0712/Audio-signature/blob/main/website/src/assets/compare_voice.png?raw=true)

-If user wants to validate the signature , he/she enters `pdf` and `the live voice` of the signer.
- we have utilized a robust Deep learning model to accurately detect same voices
- similarity is detected and based on that output is given for the user .
## Challenges we ran into
### Difficulty in capturing audio through Extension
Even After hours of surfing [`docs`](https://developer.chrome.com/docs/extensions/mv3/screen_capture/) and `stackoverflow` we were unable to run an existing npm module to detect voice thorugh extension .
realized that that particular module is incompatible with chrome extensions hence we have shifted to another approach of getting audio through `audioCapture` 

### Premium account mandatory for Insights API 
though most of the endpoints are free in test mode , we soon realized that insights endpoint is only accessible if we have a paid plan , for an AI tool Insights are really important . 
`solution` :- with combination of files API and custom logic we found a workaround to show monthly , yearly statistics by capturing all the signatures and then analysing them

## Accomplishments that we're proud of
- mastered chrome extension development🤩 
- Coding and development skills improved 
- Got to know about such an awesome API
## What's next for Signwave
### drag and drop component
-  Creating a drag and drop component within the dropboxsign itself so that users can easily utilize audio sign 
![](https://github.com/jashwanth0712/Audio-signature/blob/main/website/src/assets/next.png?raw=true)
### making AI respponsible
- Though our AI assistant works fine for many cases , there are still instances where the AI is helpful in performing not just legal but aso illegal tasks , in the immediate future we would like to create our customized transformed which can classify the prompt correctly and perform only ethical tasks.
### Making A Robust AI
since we had limited APIs we have only created few functionalities , we would love to create more robust and usefull system which has more complex functionality
