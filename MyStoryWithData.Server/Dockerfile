# �tape 1 : base ASP.NET pour ex�cution
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# �tape 2 : build de l'application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copie seulement le fichier csproj pour le restore
COPY MyStoryWithData.Server/MyStoryWithData.Server.csproj MyStoryWithData.Server/
RUN dotnet restore MyStoryWithData.Server/MyStoryWithData.Server.csproj

# Copie tout le code source
COPY . .
WORKDIR /src/MyStoryWithData.Server
RUN dotnet build -c Release -o /app/build

# �tape 3 : publish de l�application
FROM build AS publish
WORKDIR /src/MyStoryWithData.Server
RUN dotnet publish -c Release -o /app/publish

# �tape 4 : image finale avec l�application publi�e
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyStoryWithData.Server.dll"]
