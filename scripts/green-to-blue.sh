#!/bin/bash
kubectl apply -f green-deployment.yaml
kubectl set image deployment/patient-record-service-green patient-record-service=ranaliw/patient-record-service:${GITHUB_SHA} --record

