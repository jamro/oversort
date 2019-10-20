FROM swaggerapi/swagger-ui:v3.24.0

RUN mkdir -p /var/lib/swagger/schema
COPY ./schema/jamro-oversort-1.0.0-swagger.json /var/lib/swagger/schema/jamro-oversort-1.0.0-swagger.json

ENV SWAGGER_JSON=/var/lib/swagger/schema/jamro-oversort-1.0.0-swagger.json
