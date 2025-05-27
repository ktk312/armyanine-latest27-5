// constants/status.js

const StudCertificateStatus = {
    ACTIVE: "Active",
    PENDING: "Pending",
    APPROVED: "Approved",
    USED: "Used",
    EXPIRED: "Expired",
    REJECTED: "Rejected",
  };
  
  const LitterStatus = {
    PENDING: "Pending",
    VERIFIED: "Verified",
    APPROVED: "Approved",
    REGISTERED: "Registered",
    REJECTED: "Rejected",
  };
  
  const LitterInspectionStatus = {
    PENDING: "Pending",
    PENDING: "Pending",
    SCHEDULED: "Scheduled",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    REJECTED: "Rejected",
  };
  
  module.exports = {
    StudCertificateStatus,
    LitterStatus,
    LitterInspectionStatus,
  };
  