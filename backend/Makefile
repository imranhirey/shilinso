# Define variables
SRC_DIR = src
BUILD_DIR = dist
SRC_FILES = $(wildcard $(SRC_DIR)/*.ts)
BUILD_FILES = $(patsubst $(SRC_DIR)/%.ts,$(BUILD_DIR)/%.js,$(SRC_FILES))

# Default target
.DEFAULT_GOAL := build

# Build TypeScript files
build: $(BUILD_FILES)

$(BUILD_DIR)/%.js: $(SRC_DIR)/%.ts
	tsc --outDir $(BUILD_DIR) $<

# Clean build directory
clean:
	rm -rf $(BUILD_DIR)

# Run the project
run:
	node $(BUILD_DIR)/index.js
dev:
	npm run dev

# Install dependencies
install:
	npm install

# Run tests
test:
	npm test

# Phony targets
.PHONY: build clean run install test
