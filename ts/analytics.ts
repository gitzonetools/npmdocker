/**
 * smartanalytics:
 * We count executions of this tool to keep track which of our tools are really used.
 * This insight is used to plan spending our limited resources for improving them.
 * Any submitted analytics data is fully anonymized (no Ips or any other personal information is tracked).
 * Feel free to dig into the smartanalytics package, if you are interested in how it works.
 * Our privacy policy can be found here: https://lossless.gmbh/privacy.html
 * The privacy policy is also linked in the readme, so we hope this behaviour does not come as a surprise to you.
 * Have a nice day and regards
 * Your Open Source team at Lossless GmbH :)
 */
import * as smartanalytics from '@pushrocks/smartanalytics';
const npmdockerAnalytics = new smartanalytics.Analytics({
  apiEndPoint: 'https://pubapi.lossless.one',
  appName: 'npmdocker',
  projectId: 'gitzone'
});
npmdockerAnalytics.recordEvent('npmtoolexecution', {
  somedata: 'somedata'
});
