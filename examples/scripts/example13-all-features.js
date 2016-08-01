var QuickStartDescription = require('../components/QuickStartDescription')
var ReactPlayground       = require('../assets/js/ReactPlayground');
var faker = require('faker');

var AllFeaturesExample = `
  var Editors             = ReactDataGridPlugins.Editors;
  var Toolbar             = ReactDataGridPlugins.Toolbar;
  var AutoCompleteEditor  = ReactDataGridPlugins.Editors.AutoComplete;
  var DropDownEditor      = ReactDataGridPlugins.Editors.DropDownEditor;

  faker.locale = 'en_GB';

  function createFakeRowObjectData(/*number*/ index) {
    return {
      id: 'id_' + index,
      avartar: faker.image.avatar(),
      county: faker.address.county(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past().toLocaleDateString(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence()
    };
  }

  function createRows(numberOfRows) {
    var rows = [];
    for (var i = 0; i < numberOfRows; i++) {
      rows[i] = createFakeRowObjectData(i);
    }
    return rows;
  }

  var counties = [
   {value: 'Bedfordshire', label: 'Bedfordshire'},
   {value: 'Berkshire', label: 'Berkshire'},
   {value: 'Buckinghamshire', label: 'Buckinghamshire'},
   {value: 'Cambridgeshire', label: 'Cambridgeshire'},
   {value: 'Cheshire', label: 'Cheshire'},
   {value: 'Cornwall', label: 'Cornwall'},
   {value: 'Cumbria, (Cumberland)', label: 'Cumbria, (Cumberland)'},
   {value: 'Derbyshire', label: 'Derbyshire'},
   {value: 'Devon', label: 'Devon'},
   {value: 'Dorset', label: 'Dorset'},
   {value: 'Durham', label: 'Durham'},
   {value: 'Essex', label: 'Essex'},
   {value: 'Gloucestershire', label: 'Gloucestershire'},
   {value: 'Hampshire', label: 'Hampshire'},
   {value: 'Hertfordshire', label: 'Hertfordshire'},
   {value: 'Huntingdonshire', label: 'Huntingdonshire'},
   {value: 'Kent', label: 'Kent'},
   {value: 'Lancashire', label: 'Lancashire'},
   {value: 'Leicestershire', label: 'Leicestershire'},
   {value: 'Lincolnshire', label: 'Lincolnshire'},
   {value: 'Middlesex', label: 'Middlesex'},
   {value: 'Norfolk', label: 'Norfolk'},
   {value: 'Northamptonshire', label: 'Northamptonshire'},
   {value: 'Northumberland', label: 'Northumberland'},
   {value: 'Nottinghamshire', label: 'Nottinghamshire'},
   {value: 'Northamptonshire', label: 'Northamptonshire'},
   {value: 'Oxfordshire', label: 'Oxfordshire'},
   {value: 'Northamptonshire', label: 'Northamptonshire'},
   {value: 'Rutland', label: 'Rutland'},
   {value: 'Shropshire', label: 'Shropshire'},
   {value: 'Somerset', label: 'Somerset'},
   {value: 'Staffordshire', label: 'Staffordshire'},
   {value: 'Suffolk', label: 'Suffolk'},
   {value: 'Surrey', label: 'Surrey'},
   {value: 'Sussex', label: 'Sussex'},
   {value: 'Warwickshire', label: 'Warwickshire'},
   {value: 'Westmoreland', label: 'Westmoreland'},
   {value: 'Wiltshire', label: 'Wiltshire'},
   {value: 'Worcestershire', label: 'Worcestershire'},
   {value: 'Yorkshire', label: 'Yorkshire'}]

  var titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'];

  var columns = [
    {
      key: 'id',
      name: 'ID',
      width : 80,
      resizable: true
    },
    {
      key: 'avartar',
      name: 'Avartar',
      width : 60,
      formatter : ReactDataGridPlugins.Formatters.ImageFormatter,
      resizable : true,
      headerRenderer: <ReactDataGridPlugins.Formatters.ImageFormatter value={faker.image.cats()} />
    },
    {
      key: 'county',
      name: 'County',
      editor: <AutoCompleteEditor options={counties}/>,
      width : 200,
      resizable: true
    },
    {
      key: 'title',
      name: 'Title',
      editor : <DropDownEditor options={titles}/>,
      width : 200,
      resizable: true,
      events: {
        onDoubleClick: function() {
           console.log("The user double clicked on title column");
        }
      }
    },
    {
      key: 'firstName',
      name: 'First Name',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'lastName',
      name: 'Last Name',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'email',
      name: 'Email',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'street',
      name: 'Street',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'zipCode',
      name: 'ZipCode',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'date',
      name: 'Date',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'bs',
      name: 'bs',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'catchPhrase',
      name: 'Catch Phrase',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'companyName',
      name: 'Company Name',
      editable:true,
      width : 200,
      resizable: true
    },
    {
      key: 'sentence',
      name: 'Sentence',
      editable:true,
      width : 200,
      resizable: true
    }
  ];


 var Example = React.createClass({displayName: 'component',

    getInitialState : function(){
      var fakeRows = createRows(2000);
      return {rows :fakeRows};
    },

    getColumns: function() {
      var clonedColumns = columns.slice();
      clonedColumns[2].events = {
        onClick: function(ev, args) {
          var idx = args.idx;
          var rowIdx = args.rowIdx;
          this.refs.grid.openCellEditor(rowIdx, idx);
        }.bind(this)
      }

      return clonedColumns;
    },

    handleGridRowsUpdated : function(updatedRowData) {
      var rows = this.state.rows;

      for (var i = updatedRowData.fromRow; i <= updatedRowData.toRow; i++) {
        var rowToUpdate = rows[i];
        var updatedRow = React.addons.update(rowToUpdate, {$merge: updatedRowData.updated});
        rows[i] = updatedRow;
      }

      this.setState({rows: rows});
    },

    handleAddRow : function(e){
      var newRow = {
        value: e.newRowIndex,
        userStory: '',
        developer : '',
        epic : ''};
        var rows = React.addons.update(this.state.rows, {$push : [newRow]});
        this.setState({rows : rows});
    },

    getRowAt : function(index){
      if (index < 0 || index > this.getSize()){
        return undefined;
      }
      return this.state.rows[index];
    },

    getSize : function() {
      return this.state.rows.length;
    },

    render : function() {
      return (
            <ReactDataGrid
              ref='grid'
              enableCellSelect={true}
              columns={this.getColumns()}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onGridRowsUpdated={this.handleGridRowsUpdated}
              toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
              enableRowSelect={true}
              rowHeight={50}
              minHeight={600}
              rowScrollTimeout={200}
              />

      );
    }
  });
  ReactDOM.render(<Example />, mountNode);
`;


module.exports = React.createClass({

  render: function() {
    return(
      <div>
        <h3>All the features grid</h3>
        <p>This example demonstrates all the features from the previous examples.</p>
        <p>Fake data is generated using the <a href="https://github.com/Marak/faker.js">Faker</a> library which is also a global variable in this example.</p>
        <ReactPlayground codeText={AllFeaturesExample} />
      </div>
    )
  }

});
