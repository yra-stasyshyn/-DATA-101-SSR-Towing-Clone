### https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/

Open git bash terminal window. (because rm -rf command doesn't work on windows)
npm install -g @aws-amplify/cli

# Navigate to your project directory
cd /path/to/project

# Initialize a new Amplify project
amplify init
  Distribution Directory Path: .next

# Add a hosting service to your project
amplify add hosting
  Git based continuous deployment
# Deploy your project to Amplify
amplify publish


## Add custom domain to an AWS Amplify app using the CLI

# Verify your domain ownership
amplify domains verify <domain-name>

# Add the custom domain to your amplify app
amplify domains add <domain-name>

