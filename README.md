# upworksubmission

## Front-end:

.env contains REACT_APP_SERVER_URL variable to set server url;
Since i use Minikube it is set to Minikube ip in my network "http://192.168.99.100:32001"

A resulting table displays number of votes (0 and 1 votes together) grouped by image_id.

## Back-end: 

Listens 5000 port;
/votes endpoint returns the first page with 1500 votes from cats api.
