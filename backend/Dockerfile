# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the maven wrapper and pom.xml file
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Install dependencies (this step is cached if pom.xml doesn't change)
# Note: We run a dependency:go-offline to download dependencies
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copy the project source
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Run the jar file
# We assume the jar is built in target/qcut-backend-0.0.1-SNAPSHOT.jar
# Adjust the name if your artifactId or version changes
CMD ["java", "-jar", "target/qcut-backend-0.0.1-SNAPSHOT.jar"]
