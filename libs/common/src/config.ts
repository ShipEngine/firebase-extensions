export default {
  verboseLogOutput: process.env.VERBOSE_LOG_OUTPUT! == 'true' || true,
  environment: process.env.ENVIRONMENT || 'production',
};
