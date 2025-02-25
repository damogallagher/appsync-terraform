# appsync-terraform

Create an AppSync API Witgh Terraform

# AWS SSO 

## Configure

```
aws configure sso
```

*SSO session name:* damien-poc

*SSO start URL:* https://damiengallagher.awsapps.com/start

*SSO region:* us-east-1

*CLI profile name:* damien-poc

## Configure

```
aws sso login --profile damien-poc
```

# Terraform
```
export AWS_PROFILE=damien-poc
terraform fmt --recursive
terraform init
terraform plan
terraform apply --auto-approve
terraform destroy --auto-approve
```
# GraphQL Queries

## Get Item by Id - uses lambda resolver

```
query {
  getItem(id: "12345") {
    id
    created_at
  }
}
```

## Get All Items - uses vtl resolver

```
query {
  getAllItems {
    id
    created_at
  }
}
```