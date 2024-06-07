const reportLink = "support@blendnet.ai";
const CC = "sanchitsharma@blendnet.ai";
const Subject = "Bug Report: Application Issue";
const Body = `
Hi Team,

I would like to report the following bug:

Bug Description: [Define the bug here]

Steps to Reproduce:
1. [Step one]
2. [Step two]
3. [Step three]

(Optional) Attached are screenshots of the issue for your reference.

Thank you for your attention to this matter.

Best regards,
[Your Name]
`;

const userAgent = window.navigator.userAgent;
let browserName = "Unknown";
let osName = "Unknown";

// Detecting browser name
if (userAgent.includes("Chrome")) {
  browserName = "Chrome";
} else if (userAgent.includes("Firefox")) {
  browserName = "Firefox";
} else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
  browserName = "Safari";
} else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
  browserName = "Internet Explorer";
}

// Detecting OS name
if (userAgent.includes("Windows NT 10.0")) {
  osName = "Windows 10";
} else if (userAgent.includes("Windows NT 6.1")) {
  osName = "Windows 7";
} else if (userAgent.includes("Mac OS X")) {
  osName = "Mac OS X";
} else if (userAgent.includes("Linux")) {
  osName = "Linux";
}

// Constructing the mailto link
const mailtoLink = `mailto:${reportLink}?cc=${CC}&subject=${encodeURIComponent(
  Subject
)}&body=${encodeURIComponent(Body)}%0A%0A-%20Browser%3A%20${encodeURIComponent(
  browserName
)}%0A-%20OS%3A%20${encodeURIComponent(osName)}`;

export default mailtoLink;
