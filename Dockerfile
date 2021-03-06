### STAGE 1: Build ###
# base image
FROM nginx:1.16.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# copy artifact build from the 'build environment'
COPY ecollect /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
# ng build --configuration=uat
# docker build -t migutak/ecollect:uat .
# docker tag migutak/ecollect:uat 172.16.19.151:5000/ecollect:uat
# docker push migutak/ecollect:1.0.0
# docker push 172.16.19.151:5000/ecollect:uat
# docker save -o migutak_ecollect.tar migutak/ecollect:1.0.0
#