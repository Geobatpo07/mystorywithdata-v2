# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

# Set working directory
WORKDIR /src

# Copy project files and restore dependencies (layer caching optimization)
COPY ["MyStoryWithData.Server/MyStoryWithData.Server.csproj", "MyStoryWithData.Server/"]
COPY ["MyStoryWithData.Auth/MyStoryWithData.Auth.csproj", "MyStoryWithData.Auth/"]
RUN dotnet restore "MyStoryWithData.Server/MyStoryWithData.Server.csproj"

# Copy source code
COPY MyStoryWithData.Server/ MyStoryWithData.Server/
COPY MyStoryWithData.Auth/ MyStoryWithData.Auth/

# Build and publish
WORKDIR /src/MyStoryWithData.Server
RUN dotnet build "MyStoryWithData.Server.csproj" -c Release -o /app/build
RUN dotnet publish "MyStoryWithData.Server.csproj" -c Release -o /app/publish --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Set working directory
WORKDIR /app

# Install ca-certificates and curl for HTTPS and health checks
RUN apk add --no-cache ca-certificates curl

# Copy published app
COPY --from=build /app/publish .

# Set ownership and permissions
RUN chown -R appuser:appgroup /app && \
    chmod -R 755 /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Run the application
ENTRYPOINT ["dotnet", "MyStoryWithData.Server.dll"]
