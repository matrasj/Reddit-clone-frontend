Project with Angular on frontend and Spring Boot backend. Topic of a project is reddit clone and learn these technologies.
As a user you can:
- Create account and login
- Create, update, delete posts with images (only for logged in users)
- Like posts, comment posts with images (also for only logged in users)
- Browsing all posts with pagination for either non-authencitated user
- Add into your profile data like: 
  - short description
  - links to your social media
  - set profile immage 
  - see your posts history
  
  
Below i attach a couple of screenshots

Main page
![image](https://user-images.githubusercontent.com/95829811/190677444-60fa7ff8-02a3-4583-95c3-fa9ef9ec94b8.png)

Registrtion form
![image](https://user-images.githubusercontent.com/95829811/190677663-31178ef5-f367-40c7-971b-9ce1c7bec6b0.png)


Login form
![image](https://user-images.githubusercontent.com/95829811/190677541-5ef2ea63-8116-461a-bc8e-5eebe23a0232.png)

After account creation and authentication
![image](https://user-images.githubusercontent.com/95829811/190677737-0f894128-e6de-4264-8baf-48df1f615c6d.png)

Liking post
![image](https://user-images.githubusercontent.com/95829811/190677785-3cadd88e-2eef-4077-a26b-63c8d247dc6b.png)

Post in main page view
![image](https://user-images.githubusercontent.com/95829811/190677884-a6c15129-5f18-43c1-a76b-fc638e12a3ab.png)

Comment form for authenticated user
![image](https://user-images.githubusercontent.com/95829811/190678011-198bef28-823b-40ca-bcdc-ee7ff9c39814.png)


Post form 
![image](https://user-images.githubusercontent.com/95829811/190679356-31b668d5-e15f-4ac6-97fa-3d9ca62c79b7.png)

New post
![image](https://user-images.githubusercontent.com/95829811/190679481-87993014-f025-42d3-bd19-8361dd6ba35b.png)


###################################################
Commenting form another account uploading an image
![image](https://user-images.githubusercontent.com/95829811/190680296-50fa0408-901c-4b5f-a183-5f3ed3e1039b.png)


Comment view
![image](https://user-images.githubusercontent.com/95829811/190680439-07f42fa2-6a06-413c-a9bb-bba2ac995828.png)

Searching for users
![image](https://user-images.githubusercontent.com/95829811/190680624-c3f68468-3d5b-4fc0-8e27-6f5a18056ad6.png)

Some user profile
![image](https://user-images.githubusercontent.com/95829811/190681758-d2dd6a01-6501-4c2e-a721-11695f98e8f3.png)

My profile
![image](https://user-images.githubusercontent.com/95829811/190681930-cbdb515e-b0d1-4793-8779-781870de178f.png)


Edit social media link
![image](https://user-images.githubusercontent.com/95829811/190682021-0dd06a1a-21d1-4967-8c35-a6748b1b1190.png)
![image](https://user-images.githubusercontent.com/95829811/190682059-f84bbeee-dd26-49f6-b0d1-0b364be127ff.png)



###################################################
Some responsive screenshots
![image](https://user-images.githubusercontent.com/95829811/190682211-4d6044bb-453f-4b53-9e11-9e5a509a8a7e.png)
![image](https://user-images.githubusercontent.com/95829811/190682245-a69130b4-aa58-4496-998e-c98c4ca04b32.png)
![image](https://user-images.githubusercontent.com/95829811/190682316-84236e62-7192-4734-b752-1cc03210f308.png)
![image](https://user-images.githubusercontent.com/95829811/190682338-65c834a2-4152-43a8-b757-0716429b3a83.png)
![image](https://user-images.githubusercontent.com/95829811/190682418-25914b91-9056-4bfd-b5cf-d13effb2f921.png)
![image](https://user-images.githubusercontent.com/95829811/190682798-0ab7fc72-c6ad-4570-b936-c1ef1d4c5ace.png)
![image](https://user-images.githubusercontent.com/95829811/190682904-eb771d02-b10a-495a-9474-1be8bfc0931d.png)





###################################################
(EDIT) During implemenation I came across with a problem of storing images. 
I've read about 3 aproaches.
  1. Keeping binary files in database
  2. Storing files in my local drive and moving image files into project folder
  3. Storing images in cloud or internal server.
 
 Firstly I implemented this functionality with 2 aproach however after some thoughts, I decided to change it for option 3 (Amazon S3).
 I wanted to make project more real-world and by the way learn Amazon S3.
 
 ![image](https://user-images.githubusercontent.com/95829811/191217370-dad6f5b6-c542-435f-9d3a-c1ad685a995c.png)



