Deploy React app with Docker


 1. Create a VPC and Subnets

- Go to the VPC dashboard in AWS.
- Create a VPC:
  - Name: your-vpc-name
  - IPv4 CIDR block: 10.0.0.0/16
  - Tenancy: Default

- Create Subnets:

  - Subnet 1: 
    - Name: PublicSubnet1
    - VPC: your-vpc-name
    - Availability Zone: us-east-1a
    - IPv4 CIDR block: 10.0.1.0/24
    - Enable Auto-assign Public IPv4: Yes
  - Subnet 2: 
    - Name: PublicSubnet2
    - VPC: your-vpc-name
    - Availability Zone: us-east-1b
    - IPv4 CIDR block: 10.0.2.0/24
    - Enable Auto-assign Public IPv4: Yes

 2. Create an Internet Gateway and Route Table

- Create an Internet Gateway and attach it to the VPC.
- Create a Route Table:
  - Name: PublicRouteTable
  - VPC: your-vpc-name
  - Add a Route:
    - Destination: 0.0.0.0/0
    - Target: Select the Internet Gateway

- Associate Route Table with the Public Subnets.

 3. Launch an EC2 Instance

- Go to the EC2 dashboard.
- Launch an instance:
  - Choose an AMI: Amazon Linux 2 AMI (HVM)
  - Instance type: t2.micro
  - Network: Select your VPC
  - Subnet: Choose PublicSubnet1
  - Enable Auto-assign Public IP: Yes
  - Add storage: Default settings
  - Configure Security Group:
    - Allow SSH (port 22) and HTTP (port 80)
  - Launch with a key pair.

 4. Set Up the Node.js Application

SSH into your EC2 instance:

chmod 400 your-key.pem
ssh -i "your-key.pem" ec2-user@your-public-ip


Run the following commands to set up Node.js:
sudo apt update
sudo apt install npm -y
node -v
npm -v
mkdir almighty-node-app
cd almighty-node-app/
sudo npm init
sudo npm init -y
npm install express
Create the app.js file:

vim app.js

Paste the following code:
Javascript:


const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello, bitches!');
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});


~ 

Run the app:

# node app.js


Access your app using http://your-public-ip:3000 in a browser.

 5. Install Docker

Install Docker:

# Add Docker's official GPG key:

sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:

echo \ "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \ $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \ sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

# Install the Docker packages:

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


To verify try example  : sudo docker run hello-world

 6. Create a Dockerfile

Create a Dockerfile in the almighty-node-app directory:

vim Dockerfile

Add the following:

# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Specify the command to run your application
CMD ["node", "app.js"]


Build the Docker image:

sudo docker build -t almighty-node-app .


Run the Docker container:

sudo docker run -p 3000:3000 almighty-node-app

 7. Configure AWS CLI

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version or /usr/local/bin/aws --version


Create an ECR Repository:
 CREATE REPO > ADD A REPO NAME > CREATE

  - Name: almighty/nodealmighy
  - Make it private

 8. Push Docker Image to ECR

For pushing image from Local machine (ec2 instance) to ECR

Tag and push the image:

sudo -E aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 369350049400.dkr.ecr.us-east-1.amazonaws.com

( There was an error occurred while trying to execute without sudo -E, as credentials seems missing error popped up while pushing )

Tag image:

sudo docker tag almighty-node-app:latest 369350049400.dkr.ecr.us-east-1.amazonaws.com/almighty/nodealmighy:latest	

Push image to ECR repo:

sudo docker push 369350049400.dkr.ecr.us-east-1.amazonaws.com/almighty/nodealmighy:latest

 9. Create ECS Cluster Using Fargate

- Go to the ECS dashboard.
- Create a Cluster:

Select : Launch type
Select Fargate
Deployment configuration:
Application type - Service
Task definition - select our Task def which is newly created
Desired tasks : 1
Deployment options : - 
Blue/green deployment (powered by AWS CodeDeploy)

Deployment configurationInfo
CodeDeployDefault.ECSAllAtOnce

  - Select "Networking only" (for Fargate).
  - Configure VPC and Subnets.

 10. Create a Task Definition

Enter Task definition family
Launch type : AWS Fargate
Give OS details 
CPU : .5
Mem: 1
Container : give name, image URI
Port : 3000 (since we are using React app its using 3000 as default port)

Create

 11. Create ECS Service

Create a Service:

Launch Type: Fargate
Task Definition: Select the task definition created earlier.
Service Name: your-service-name
Desired Tasks: 1
 Create a Service Role for CodeDeploy
- Create a Role for ECS CodeDeploy in IAM if using Blue/Green deployments.

Networking:
VPC: Select the VPC.
Subnets: Select public subnets.
Security Group: Allow inbound traffic on port 3000.

Load Balancing:
Create an Application Load Balancer (ALB):
  - Name: your-alb-name
  - Scheme: Internet-facing
  - Listeners:
    - Listener 1: HTTP on port 80
    - Listener 2: HTTP on port 8080
- Availability Zones: Select your VPC and subnets (ensure to choose public subnets).


Configure Security Groups:
 Security Group Name: your-sg-name
  - Allow inbound traffic on ports 80 and 8080 from 0.0.0.0/0.

- Configure Routing:
  - Target Group Name: your-target-group
  - Target Type: IP
  - Protocol: HTTP
  - Port: 80 (default)

- Health Checks:
  - Path: /
  - Healthy threshold: 5
  - Unhealthy threshold: 2
  - Timeout: 5 seconds
  - Interval: 30 seconds

- Tags: (Optional)
  - Add any tags you need.

- Review and Create the ALB.


Target Group: Create a target group for the ECS tasks.



Configure Step Scaling for ECS Service


Then click Create .

 12 .Create a new CodeDeploy Application : ( Will create automatically , just adding steps for ref )



13. Create deployment group



- Create the Deployment Group.

 14. Update ECS Service for CodeDeploy

- Go back to the ECS Dashboard.
- Select the ECS Cluster.
- Choose the Service you want to update.
- Select Update Service.
  
  - Application Name: Select the CodeDeploy application you just created.
  - Deployment Group Name: Select the deployment group created earlier.
  
  - Task Definition: Choose the updated task definition (if required).
  - Number of Tasks: Adjust the desired number of tasks.
  - Load Balancer: Ensure the ALB and Target Groups are configured correctly.

- Click Update to apply the changes.


