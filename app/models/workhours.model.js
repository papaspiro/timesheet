Work = require('./work.model.js');
Worker = require('./worker.model.js');

module.exports = (sequelize,Sequelize) => {
  const WorkHours = sequelize.define('workhours',{
  date: {
   type:Sequelize.DATE,
   allowNull: false
  },
  hours: {
   type:Sequelize.INTEGER,
   allowNull: false
 },
 work_id: {
   type: Sequelize.INTEGER,
   //allowNull: false
 },
 worker_id: {
   type: Sequelize.INTEGER,
   //allowNull: false
 },

},
  {
   paranoid: true,
   underscored: true
 }
);

worker = Worker(sequelize,Sequelize);

work = Work(sequelize,Sequelize);
/*
Comment.associate = function(models) {
  // associations can be defined here
  Comment.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'author'
  });
  Comment.belongsTo(models.Post, {
    foreignKey: 'postId',
    as: 'post'
  });
};
*/

WorkHours.associate = (models) => {
  WorkHours.belongsTo(models.Worker,{foreignKey: "worker_id" });
  WorkHours.belongsTo(models.Work,{ foreignKey: "work_id"});
};

//WorkHours.belongsTo(worker);
//WorkHours.belongsTo(work);
 return WorkHours;
}
