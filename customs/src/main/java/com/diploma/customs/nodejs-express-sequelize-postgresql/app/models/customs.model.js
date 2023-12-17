module.exports = (sequelize, Sequelize) => {
  const Customs = sequelize.define("customs", {
    userRole: {
      type: Sequelize.STRING
    },
    userName: {
      type: Sequelize.STRING
    },
    userPassword: {
      type: Sequelize.STRING
    },
    registrationDate: {
    type: Sequelize.DATEONLY
    }
  });

  return Customs;
};