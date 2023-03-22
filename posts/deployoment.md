---
title: "How to Setup a Next.js App on Ubuntu 22.04"
date: "2023-03-22"
---

### How to Setup a Next.js App on Ubuntu 22.04




 In this series of articles, we will walk through the process of setting up a Next.js app on a custom Ubuntu 22.04
 server using various tools and technologies. In this first article, we will cover the initial setup steps required
 to get started with the Next.js app.



##      Setting up the server

 To get started, we need to set up a Google Cloud VM with Ubuntu 22.04. There are many ways to do this, but we
 recommend following the official walkthrough provided by Google Cloud, which can be found here. Once you have set up
 your VM, you can proceed to the next step.


## Creating a Next.js app

### Step 2:

 Once you have set up your VM, you need to install Node.js and npm on Ubuntu 22.04. You can do this by running the
 following commands:

  `sudo apt-get update`
  `sudo apt-get install node.js`
  `sudo apt-get install npm`


###Step 3:

 Creating a directory for the site and setting up the Next.js app with npx create-next-app
 Next, we need to create a directory for the site and set up the Next.js app. You can do this by running the
 following commands:

  `mkdir /[USER]/site`
  `cd /[USER]/site`
  `npx create-next-app test-app`

 *Make sure to replace `[USER]` with your username and set the project name to "test-app".*


### Step 4:

 **Installing dependencies for the Next.js app with npm install**

 Once the Next.js app has been set up, we need to install its dependencies. You can do this by running the following
 command:

  `cd test-app`
  `npm install`

 This will install all the dependencies required to run the Next.js app.


    ### Step 5:

 Once the dependencies have been installed, we can build a production version of the Next.js app. You can do this by
 running the following command:

  `npm run build --omit=dev`

 This will generate a production build of the Next.js app.


    ### Step 6:
 
 Now that we have built the production version of the Next.js app, we can start the app server. You can do this by
 running the following command:

  `npm run start`

 This will start the app server, and you should see output similar to the following:

  `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`

    ### Step 7:

 Finally, we can test the Next.js app on the local server. To do this, open your web browser and navigate to
 `https://localhost:3000` and you should see the initail Next.js landing page.



  ##Setting Up PM2 and Nginx for Next.js Website Deployment

 Prerequisites
 Before proceeding with this article, make sure you have completed the steps outlined in the first article: "Setting
 up a Next.js project on Ubuntu 22.04 with Node.js, NPM, and create-next-app".
 You will also need a domain name that points to your server for some of these steps.



 Step 1:


 Open a terminal and run the command:

sudo apt-get install pm2

 Once PM2 is installed, we can start our Next.js server in the background by running:

pm2 start npm --name "test-app" -- run start

 Verify that our website is up and running by browsing to localhost:3000.


 Step 2:


 Install Nginx on our server by running the command: sudo apt-get install nginx.


 Create a new Nginx config file in the sites-enabled directory by running: sudo nano
 /etc/nginx/sites-enabled/testapp.com.


 Paste the following code into the file, modifying the values as appropriate for our website:

server {

> 80;
> server_name testapp.com www.testapp.com;

> location / {
> proxy_pass http://localhost:3000;
> proxy_set_header Host $host;
> proxy_set_header X-Real-IP $remote_addr;
> }

> listen [::]:443 ssl ipv6only=on;
> listen 443 ssl;
> ssl_certificate /etc/letsencrypt/live/testapp.com/fullchain.pem;
> ssl_certificate_key /etc/letsencrypt/live/testapp.com/privkey.pem;

}

(Be sure to change 'testapp' to the name of your app in future use)



 Save the file and create a symbolic link to it with the command:

sudo ln -s /etc/nginx/sites-available/testapp.com /etc/nginx/sites-enabled/testapp.com

 Verify that our Nginx configuration is valid by running:

sudo nginx -t

If the configuration is valid, reload Nginx by running:

sudo systemctl reload nginx

 Step 3:


 Install UFW by running the command:

sudo apt-get install ufw

 Verify the status of UFW by running:

sudo ufw status

 Allow full access to Nginx with the command:

sudo ufw allow 'Nginx Full'

 Delete any redundant HTTP rules with the command:

sudo ufw delete allow 'Nginx HTTP'

 Start our website again through PM2 with the command:

pm2 start test-app

 Verify that our website is still accessible by browsing to localhost:3000.


 By completing the steps outlined in this article, we have installed and configured PM2 and Nginx to work with our
 Next.js website, and set up HTTPS and firewall rules to secure our site. In the next article, we will cover the
 final step of our deployment process: obtaining and configuring SSL certificates with Certbot.

How to Set Up SSL Certs with Certbot on Ubuntu 22.04

 SSL certificates are an important component of securing your website. They ensure that data exchanged between your
 website and your users is encrypted and protected from malicious attacks. In this article, we will show you how to
 set up SSL certs with Certbot on Ubuntu 22.04.



 Certbot is a free, open-source software tool that automates the process of obtaining and installing SSL
 certificates. To install Certbot on Ubuntu 22.04, follow these steps:


 Step 1:


 Open a terminal window.


 Type the following command to add the Certbot repository:

sudo add-apt-repository ppa:certbot/certbot

 Update your system's package list with:

sudo apt-get update

Install Certbot on your system with:

sudo apt-get install certbot

Automatically Installing and Implementing Certs with Certbot

 Using Certbot with Nginx is a quick and easy way to obtain and implement SSL certificates for your website. Follow
 these steps to use Certbot to automatically obtain and implement SSL certificates:


 Step 2:


 Type the following command:

sudo certbot --nginx

 Certbot will prompt you to enter your email address and agree to the terms of service.

 Certbot will then automatically detect your Nginx configuration and prompt you to select the domain name for which
 you want to obtain SSL certificates.

 Certbot will obtain and install the SSL certificates for you.

 Step 3: Manually Creating and Setting Certs with Certbot

 In some cases, you may need to manually create and set SSL certificates with Certbot. Follow these steps to manually
 create and set SSL certificates with Certbot:

 Type the following command:

sudo certbot certonly --manual

 Certbot will prompt you to enter the domain name for which you want to obtain SSL certificates.

 Certbot will then prompt you to create a TXT record for your domain name to verify that you own the
 domain.

 Create the TXT record in the directory Certbot lists on this step.

 Once the TXT record is propagated, Certbot will complete the SSL certificate issuance process.

 Install the SSL certificates on your webserver.

 Step 4: Verifying Certbot Status and Testing Autorenew

 To verify that Certbot is working correctly and that your SSL certificates are set up correctly, follow these
 steps:

 Type the following command to check the status of Certbot:

sudo systemctl status certbot.timer

 This will display the status of Certbot and show you any errors or issues.

 To test autorenewal of SSL certificates, type the following command:

sudo certbot renew --dry-run

 This will simulate the renewal process and show you any errors or issues.

In this article, we have shown you how to set up Node.js and npm, how to build a Next.js app and how to set up
Ngnix
in order to host it, as well as setting up HTTPS with Certbot and SSL certificates. Now we can
setup a git repository inorder to continuously deliver our website on this server.

Setting up Github on Ubuntu for Deploying a Next.js Website

In this article, we will discuss how to set up Github on Ubuntu for deploying a Next.js website. Github is a
popular
platform that provides a version control system for your codebase. By using Github, you can manage your codebase
more efficiently and collaboratively with other developers.

 Step 1:


 Log into Github and create a repository


 The first step is to log into Github and create a repository for your app. This repository will contain all the code
 of your Next.js website. You can create a repository by clicking on the "New" button on your Github dashboard and
 entering the required information.



 Step 2:

Initialize Git in your app directory

 After creating the repository, the next step is to initialize Git in your app directory. To do this, navigate to
 your app directory using the terminal with the following command:

cd /home/[USER]/site

 Once you're in the app directory, initialize Git with the following command:

git init

Step 3:
  Add and commit your changes

 After initializing Git, you can check the status of your files with the following command:

git status

 This will show you any untracked files in your app directory. You can add these untracked files with the following
 command:

git add .

 Once you have added your files, you can perform a commit with the following command:

git commit -m "[Your commit message here]"

Step 4:
  Set up SSH connection with Github

 To set up an SSH connection with Github, you need to create an SSH key in Ubuntu. To do this, use the following
 command:

ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

 This will generate a new SSH key pair. After generating the key pair, show the public key with the following
 command:

cat ~/.ssh/id_rsa.pub

 Copy the public key that is displayed.

 Next, browse to the SSH key section of your Github profile and add the public key that you copied earlier.

 While in Github, browse to your repository and under the "Code" dropdown menu, select 'ssh' and copy the link.

 Add this link as a remote repository with the command:

git remote add -m [link from github]

 Check to make sure your 'remote' is setup propery with the command:

git remote

 This should output:

master

 Finally, test your Github SSH connection with the following command:

ssh -T git@github.com

 This should display a success message.

 Step 5: Push your Git repository to Github

 After setting up the SSH connection, you can push your Git repository to Github. Use the following command to push
 your repository:

git push --all origin

 This will push all the changes in your repository to Github.

 Conclusion

 In this article, we discussed how to set up Github on Ubuntu for deploying a Next.js website. By following these
 steps, you can easily manage your codebase and collaborate with other developers. With Github, you can push your
 changes to the repository and deploy them to your server with ease.
