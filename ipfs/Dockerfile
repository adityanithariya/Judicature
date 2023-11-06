# Use the go-ipfs image from Docker Hub as the base image
FROM ipfs/go-ipfs:latest

# Copy the entrypoint script into the image
COPY entrypoint.sh /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Expose port 4001 to port 80
EXPOSE 80:4001

# Default command to run IPFS daemon
CMD ["ipfs", "daemon"]
