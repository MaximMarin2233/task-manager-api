# Use Node.js 20
FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install deps
RUN npm install

# Copy all files
COPY . .

# Генерируем Prisma Client внутри контейнера
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "run", "dev"]
