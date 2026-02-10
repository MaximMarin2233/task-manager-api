// long op

process.on('message', async (task: any) => {
  try {
    // long task
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const result = {
      processedPayload: task.payload,
      finishedAt: new Date(),
    };

    if (process.send) {
      process.send({ success: true, result });
    }
  } catch (error) {
    if (process.send) {
      process.send({ success: false });
    }
  }
});
