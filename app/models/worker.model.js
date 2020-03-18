module.exports = (sequelize,Sequelize) => {

  const Worker = sequelize.define('worker',{
  /*id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },*/
  first_name: {
    type:Sequelize.STRING,
   allowNull: false

  },
  last_name: {
    type:Sequelize.STRING,
    allowNull: false

  },
  created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
  updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
  }
},
{
   paranoid: true,
   underscored: true
 }
);

Worker.associate = (models) => {
    Worker.hasMany(models.Workhours,{foreignKey: "worker_id"});
  };

return Worker;
}
