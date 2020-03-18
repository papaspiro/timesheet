module.exports = (sequelize,Sequelize) => {
  const Work = sequelize.define('work',{
    /*  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },*/
  title: {
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

  Work.associate = (models) => {
    Work.hasMany(models.Workhours,{foreignKey: "work_id"});
  };

  return Work;
}
