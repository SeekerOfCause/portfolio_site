---
title: "How to Setup a Next.js App on Ubuntu 22.04"
date: "2023-03-22"
---

# How to Setup a Next.js App on Ubuntu 22.04

---

 In this article, we will walk through the process of setting up a Next.js app on a custom Ubuntu 22.04 server using various tools and technologies. In this first article, we will cover the initial setup steps required to get started with the Next.js app.


- [How to Setup a Next.js App on Ubuntu 22.04](#how-to-setup-a-nextjs-app-on-ubuntu-2204)
  - [Setting up the server](#setting-up-the-server)
  - [Creating a Next.js app](#creating-a-nextjs-app)
    - [Step 1: Installing Node.js and npm](#step-1-installing-nodejs-and-npm)
    - [Step 2: Creating a directory for the site and setting up the Next.js app with npx create-next-app](#step-2-creating-a-directory-for-the-site-and-setting-up-the-nextjs-app-with-npx-create-next-app)
    - [Step 3: Installing dependencies with npm install](#step-3-installing-dependencies-with-npm-install)
    - [Step 4: Build Next App](#step-4-build-next-app)
    - [Step 5: Starting Next Server](#step-5-starting-next-server)
    - [Step 6: Browsing to Next Page](#step-6-browsing-to-next-page)
  - [Setting Up PM2 and Nginx for Next.js Website Deployment](#setting-up-pm2-and-nginx-for-nextjs-website-deployment)
    - [Step 1: Installing pm2](#step-1-installing-pm2)
    - [Step 2: Install Nginx](#step-2-install-nginx)
    - [Step 3: Installing ufw](#step-3-installing-ufw)
  - [Setting Up SSL Certs with Certbot on Ubuntu 22.04](#setting-up-ssl-certs-with-certbot-on-ubuntu-2204)
    - [Step 1: Install Certbot](#step-1-install-certbot)
    - [Step 2: Create certs fot the Next.js App](#step-2-create-certs-fot-the-nextjs-app)
    - [Step 3: Manually Creating and Setting Certs with Certbot](#step-3-manually-creating-and-setting-certs-with-certbot)
    - [Step 4: Verifying Certbot Status and Testing Autorenew](#step-4-verifying-certbot-status-and-testing-autorenew)
  - [Setting up Github on Ubuntu for Deploying a Next.js Website](#setting-up-github-on-ubuntu-for-deploying-a-nextjs-website)
    - [Step 1: Log into Github and create a repository](#step-1-log-into-github-and-create-a-repository)
    - [Step 2: Initialize Git in your app directory](#step-2-initialize-git-in-your-app-directory)
    - [Step 3: Adding all untracked files to the commit](#step-3-adding-all-untracked-files-to-the-commit)
  - [Step 4: Setting up an ssh connection to the repository](#step-4-setting-up-an-ssh-connection-to-the-repository)
    - [Step 5: Push your Git repository to Github](#step-5-push-your-git-repository-to-github)



## Setting up the server

 To get started, we need to set up a Google Cloud VM with Ubuntu 22.04. There are many ways to do this, but we recommend following the official [walkthrough](https://cloud.google.com/compute/docs/instances/create-start-instance) provided by Google. 
 
 Once you have set up your VM, come back and proceed to the next step.


## Creating a Next.js app

### Step 1: Installing Node.js and npm

  Once you have set up your VM, you need to install Node.js and npm on Ubuntu 22.04. You can do this by running the following commands:

  >`sudo apt-get update`
  >`sudo apt-get install node.js`
  >`sudo apt-get install npm`


### Step 2: Creating a directory for the site and setting up the Next.js app with npx create-next-app


 Next, we need to create a directory for the site and set up the Next.js app. You can do this by running the following commands:

  >`mkdir /[USER]/site`
  >`cd /[USER]/site`
  >`npx create-next-app test-app`

 *Make sure to replace `[USER]` with your username and set the project name to "test-app".*


### Step 3: Installing dependencies with npm install

 Once the Next.js app has been set up, we need to install its dependencies. You can do this by running the following command:

  >`cd test-app`
  >`npm install`

 This will install all the dependencies required to run the Next.js app.


### Step 4: Build Next App

 Once the dependencies have been installed, we can build a production version of the Next.js app. You can do this by running the following command:

  >`npm run build --omit=dev`

 This will generate a production build of the Next.js app.


### Step 5: Starting Next Server
 
 Now that we have built the production version of the Next.js app, we can start the app server. You can do this by  running the following command:

 >`npm run start`

 This will start the app server, and you should see output similar to the following:

 > `ready - started server on 0.0.0.0:3000, url: http://localhost:3000`

    
### Step 6: Browsing to Next Page

 Finally, we can test the Next.js app on the local server. To do this, open your web browser and navigate to `https://localhost:3000` and you should see the initail Next.js landing page.

---

## Setting Up PM2 and Nginx for Next.js Website Deployment

 *Prerequisites
 Before proceeding with this article, make sure you have completed the steps outlined in the first article: "Setting up a Next.js project on Ubuntu 22.04 with Node.js, NPM, and create-next-app".*

*You will also need a domain name that points to your server for some of these steps.*



### Step 1: Installing pm2

 Open a terminal and run the command:

 >`sudo apt-get install pm2`

 Once PM2 is installed, we can start our Next.js server in the background by running:

  >`pm2 start npm --name "test-app" -- run start`

 Verify that our website is up and running by browsing to localhost:3000.


### Step 2: Install Nginx


 Install Nginx on our server by running the command: 
 
  >`sudo apt-get install nginx`


 Create a new Nginx config file in the sites-enabled directory by running: 
 
 >`sudo nano /etc/nginx/sites-enabled/testapp.com.`


 Paste the following code into the file, modifying the values as appropriate for our website:

 >`server {` 

 >` 80;`
 >` server_name testapp.com www.testapp.com;` 

 >` location / {`
 >` proxy_pass http://localhost:3000;`
 >` proxy_set_header Host $host;`
 >` proxy_set_header X-Real-IP $remote_addr;`
 >` }`

 >` listen [::]:443 ssl ipv6only=on;`
 >` listen 443 ssl;`
 >` ssl_certificate /etc/letsencrypt/live/testapp.com/fullchain.pem;`
 >` ssl_certificate_key /etc/letsencrypt/live/testapp.com/privkey.pem;`
 >`}`` `

 ***(Be sure to change 'testapp' to the name of your app in future use)***



 Save the file and create a symbolic link to it with the command:

  >`sudo ln -s /etc/nginx/sites-available/testapp.com /etc/nginx/sites-enabled/testapp.com`

 Verify that our Nginx configuration is valid by running:

  >`sudo nginx -t`

 If the configuration is valid, reload Nginx by running:

  >`sudo systemctl reload nginx`

### Step 3: Installing ufw


 Install UFW by running the command:

 >`sudo apt-get install ufw
`
 Verify the status of UFW by running:

 >`sudo ufw status`

 Allow full access to Nginx with the command:

  >`sudo ufw allow 'Nginx Full'`

 Delete any redundant HTTP rules with the command:

 >`sudo ufw delete allow 'Nginx HTTP'`

 Start our website again through PM2 with the command:

 >`pm2 start test-app`

 Verify that our website is still accessible by browsing to `localhost:3000`.


 By completing the steps outlined in this article, we have installed and configured PM2 and Nginx to work with our Next.js website, and set up HTTPS and firewall rules to secure our site.

---

## Setting Up SSL Certs with Certbot on Ubuntu 22.04

 SSL certificates are an important component of securing your website. They ensure that data exchanged between your website and your users is encrypted and protected from malicious attacks.

 Using Certbot with Nginx is a quick and easy way to obtain and implement SSL certificates for your website. Follow these steps to use Certbot to automatically obtain and implement SSL certificates:

 Certbot is a free, open-source software tool that automates the process of obtaining and installing SSL certificates. To install Certbot on Ubuntu 22.04, follow these steps:


### Step 1: Install Certbot


 Open a terminal window.


 Type the following command to add the Certbot repository:

  >`sudo add-apt-repository ppa:certbot/certbot`

 Update your system's package list with:

  >`sudo apt-get update`

 Install Certbot on your system with:

  >`sudo apt-get install certbot`



### Step 2: Create certs fot the Next.js App

 Type the following command:

 >`sudo certbot --nginx`

 Certbot will prompt you to enter your email address and agree to the terms of service.

 Certbot will then automatically detect your Nginx configuration and prompt you to select the domain name for which you want to obtain SSL certificates.

 Certbot will obtain and install the SSL certificates for you.

### Step 3: Manually Creating and Setting Certs with Certbot

 In some cases, you may need to manually create and set SSL certificates with Certbot. Follow these steps to manually  create and set SSL certificates with Certbot:

 Type the following command:

  >`sudo certbot certonly --manual`

 Certbot will prompt you to enter the domain name for which you want to obtain SSL certificates.

 Certbot will then prompt you to create a TXT record for your domain name to verify that you own the domain.

 Create the TXT record in the directory Certbot lists on this step.

 Once the TXT record is propagated, Certbot will complete the SSL certificate issuance process.

 Install the SSL certificates on your webserver.

### Step 4: Verifying Certbot Status and Testing Autorenew

 To verify that Certbot is working correctly and that your SSL certificates are set up correctly, follow these  steps:

 Type the following command to check the status of Certbot:

  >`sudo systemctl status certbot.timer`

 This will display the status of Certbot and show you any errors or issues.

 To test autorenewal of SSL certificates, type the following command:

  >`sudo certbot renew --dry-run`

 This will simulate the renewal process and show you any errors or issues.

---

## Setting up Github on Ubuntu for Deploying a Next.js Website

Github is a popular platform that provides a version control system for your codebase. By using Github, you can manage your codebase more efficiently and collaboratively with other developers.

### Step 1: Log into Github and create a repository

 The first step is to log into Github and create a repository for your app. 
 
 This repository will contain all the code  of your Next.js website. 
 
 You can create a repository by clicking on the "New" button on your Github dashboard and  entering the required information.



### Step 2: Initialize Git in your app directory

 After creating the repository, the next step is to initialize Git in your app directory. To do this, navigate to  your app directory using the terminal with the following command:

  >`cd /home/[USER]/site`

 Once you're in the app directory, initialize Git with the following command:

  >`git init`

### Step 3: Adding all untracked files to the commit


 After initializing Git, you can check the status of your files with the following command:

  >`git status`

 This will show you any untracked files in your app directory. You can add these untracked files with the following command:

  >`git add .`

 Once you have added your files, you can perform a commit with the following command:

  >`git commit -m "[Your commit message here]"`

## Step 4: Setting up an ssh connection to the repository

 To set up an SSH connection with Github, you need to create an SSH key in Ubuntu. To do this, use the following command:

  >`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

 This will generate a new SSH key pair. After generating the key pair, show the public key with the following command:

  >`cat ~/.ssh/id_rsa.pub`

 Copy the public key that is displayed.

 Next, browse to the SSH key section of your Github profile and add the public key that you copied earlier.

 While in Github, browse to your repository and under the "Code" dropdown menu, select 'ssh' and copy the link.

 Add this link as a remote repository with the command:

  >`git remote add -m [link from github]`

 Check to make sure your 'remote' is setup propery with the command:

  >`git remote`

 This should output:

  >`master`

 Finally, test your Github SSH connection with the following command:

  >`ssh -T git@github.com`

 This should display a success message.

### Step 5: Push your Git repository to Github

 After setting up the SSH connection, you can push your Git repository to Github. Use the following command to push your repository:

  >`git push --all origin`

 This will push all the changes in your repository to Github.

---

 In this article, we discussed how to set up Github on Ubuntudeploying and a Next.js website, setting up a pm2 instance to keep our Next.js lite alive, setting up SSL certs with Certbot, and setting up a git repository for continuous delivery to the server.
 
 By following these steps, you can easily manage your codebase and collaborate with other developers. With Github, you can push your  changes to the repository and deploy them to your server with ease.
