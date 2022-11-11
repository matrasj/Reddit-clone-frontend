Main goal of Reddit-clone project was simple - create social media app similar to reddit. Beacuse of big DOM manipultion complexity, I used Angular framework to make development process faster, and learn this technology.
In app as a user you can add posts with images, comment posts, like posts, manipulation you profile account, search for users and more.
Whan it comes to sotring images in backend side I've read about 3 approaches:
  1 - Store lobs in database
  2 - Storing data in my local machine disk
  3 - User some external cloud service
In first phase of project development I followed second approach, however in order to learn new thins I changed this functionality to third approach using Amazon S3.

Moreover project is fully responsive.

In future I'm planning create chat functionality using websocket protocole.

Below I attach screenshots gallery.

# Main page ( authenticated users can comment, like and post )
![image](https://user-images.githubusercontent.com/95829811/201358601-74a13933-01a3-487c-833d-2546b64da1b9.png)
![image](https://user-images.githubusercontent.com/95829811/201358664-bbf0f70d-c24b-4525-92a3-4b89a70765bd.png)
![image](https://user-images.githubusercontent.com/95829811/201358733-16ecda01-2a46-4cbf-8abe-247fd6c1c764.png)
![image](https://user-images.githubusercontent.com/95829811/201358767-5400277d-d9bb-4013-bfd8-23afa2215b75.png)

# Let's logout and try like post
![image](https://user-images.githubusercontent.com/95829811/201359026-a9a2d404-6efd-4d29-8f16-3d4d9910be51.png)

# We are redirected to login page
![image](https://user-images.githubusercontent.com/95829811/201359084-cc424704-4db1-46e9-8639-ed4cc979fb06.png)
![image](https://user-images.githubusercontent.com/95829811/201359113-79e6de00-179f-4ca1-857a-9aa8e6c1bb35.png)

# Register form with reactive forms validation
![image](https://user-images.githubusercontent.com/95829811/201359247-ebbd220d-f373-445f-b118-74b24f5ebde7.png)

# Sub-reddit creation form
![image](https://user-images.githubusercontent.com/95829811/201359424-b67b3ce7-d38e-4f0f-a613-f620d150c511.png)

# Posts filtered by sub-reddit name
![image](https://user-images.githubusercontent.com/95829811/201359583-187eb1e2-4622-42aa-9d85-4ac764bccc20.png)

# View for all sub-reddits
![image](https://user-images.githubusercontent.com/95829811/201359671-ad45c9ac-bf7f-4afe-94b8-fdc471c5928a.png)

# Let's read the post
![image](https://user-images.githubusercontent.com/95829811/201359782-72319863-d6d3-4d80-a161-12f0fb6c119d.png)
![image](https://user-images.githubusercontent.com/95829811/201359853-10cccd22-d50a-46d1-a60e-e76578663ca6.png)
![image](https://user-images.githubusercontent.com/95829811/201359899-a5adca0f-9b37-413f-8ead-68103a7c8cfc.png)

# Post form creation
![image](https://user-images.githubusercontent.com/95829811/201360104-8b0405bb-8df1-4d35-bcef-2f5c1d95eaa7.png)

# Let's search for users
![image](https://user-images.githubusercontent.com/95829811/201360187-bc6a42f3-ced0-4263-ac06-2f8e20417664.png)
![image](https://user-images.githubusercontent.com/95829811/201360230-f6ff12c3-625f-401c-8707-239238023492.png)

# My account's profile
![image](https://user-images.githubusercontent.com/95829811/201360305-233de9fb-a336-44aa-a46d-a94f75a780e8.png)

# I can manipulate with my posts
![image](https://user-images.githubusercontent.com/95829811/201360398-9509bae3-c91c-47e7-bc34-423d27f0eaba.png)

# My profile's info
![image](https://user-images.githubusercontent.com/95829811/201360500-7feb09da-3981-4d1f-b50f-b8f79ff61ec1.png)

# Creating social link
![image](https://user-images.githubusercontent.com/95829811/201360662-c1358d5a-8613-4547-a410-c58b61a44d66.png)
![image](https://user-images.githubusercontent.com/95829811/201360708-e4b65c71-a898-4ed4-a74b-856cd67d3bb4.png)

# We can look for another profile but we can't chagne their profile info
![image](https://user-images.githubusercontent.com/95829811/201360856-4ea3a0d7-d335-4898-b027-3309d2e8534d.png)

# Give a like :D
![image](https://user-images.githubusercontent.com/95829811/201360931-7f7e8d12-5acf-43ef-aec8-39820f781e1c.png)

# Responsive screenshots
![image](https://user-images.githubusercontent.com/95829811/201361143-fd554e4d-3e61-498f-9d67-0d71b3591c33.png)
![image](https://user-images.githubusercontent.com/95829811/201361182-319e41b4-2370-4d28-959d-0425d6cb023e.png)
![image](https://user-images.githubusercontent.com/95829811/201361265-80691236-b516-4e42-97de-e732b1534995.png)
![image](https://user-images.githubusercontent.com/95829811/201361350-f3e5c645-283f-4481-b7a1-bdd56b2ba635.png)
![image](https://user-images.githubusercontent.com/95829811/201361381-f671b102-f5f6-40ef-9859-5ffacddd773d.png)
![image](https://user-images.githubusercontent.com/95829811/201361435-4d1b2e72-e113-4168-a8d5-00c21c10288a.png)
![image](https://user-images.githubusercontent.com/95829811/201361502-e03e36d4-aad9-4ae4-889d-0e572e8216c4.png)
![image](https://user-images.githubusercontent.com/95829811/201361560-80aa7507-2339-45db-b983-2ac737a71a36.png)
![image](https://user-images.githubusercontent.com/95829811/201361653-7be8042e-ff30-4eab-bb7a-2accbfd4e325.png)
![image](https://user-images.githubusercontent.com/95829811/201361699-9ff7869d-926d-44c1-a21a-f90a91462ba4.png)
![image](https://user-images.githubusercontent.com/95829811/201361727-22ef5388-0e3c-4cac-8588-f9e9e9f859dc.png)
![image](https://user-images.githubusercontent.com/95829811/201361773-25cfb485-cf45-4ff7-ac1f-c07ba9a10153.png)










