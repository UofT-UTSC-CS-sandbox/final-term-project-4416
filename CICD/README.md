# File info

```
.
├── CI-CD-report.pdf
├── client
│   └── Dockerfile
├── docker-compose.yml
├── .gitlab-ci.yml
├── qodana.yaml
├── README.md
├── server
│   └── Dockerfile
└── template.zip
```

- configureation file
    - `docker-compose.yml`
        - used with `docker-compose` command to automate image building and environment/network setup (also used for local image testing)
    - `.gitlab-ci.yml`
        - used by gitlab to automate testing and image building
    - `qodana.yaml` used by github action to generate code quality report (can be found in github action)
- docker file
    - `client/Dockerfile` used to build client image
    - `server/Dockerfile` used to build server image
- automation script
    - not needed for our project since
        - CI is totally managed by gitlab
        - CD is totally managed by azure contanerized engine
        - CI and CD connected by web hook
- additional file
    - `template.zip` can be used to create azure resource
    - `CI-CD-report` the report :)

    