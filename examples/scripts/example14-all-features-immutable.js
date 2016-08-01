(function(){
  var React       = require('react');
  var ReactDataGrid = require('../build/react-data-grid');
  var UIPlugins       = require('../build/react-data-grid.ui-plugins');
  var Editors             = ReactDataGridPlugins.Editors;
  var Toolbar             = ReactDataGridPlugins.Toolbar;
  var AutoCompleteEditor  = Editors.AutoComplete;
  var DropDownEditor      = Editors.DropDownEditor;
  var joinClasses          = require('classnames');
  var FakeObjectDataStore = require('./FakeObjectDataStore');
  var {ContextMenu, MenuItem} = ReactDataGridPlugins.Menu;
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
   {value: 'Durham', label:'Durham'},
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


  var columns = new Immutable.List([
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
      resizable : true
    },
    {
      key: 'county',
      name: 'County',
      editor: <AutoCompleteEditor options={counties} onCommit={() => {}} column={{name:'county', key:'county', width: 200}} value='wicklow'/>,
      width : 200,
      resizable: true
    },
    {
      key: 'title',
      name: 'Title',
      editor : <DropDownEditor options={titles}/>,
      width : 200,
      resizable: true
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
  ]);

var MyContextMenu = React.createClass({
  onItemClick: function(e, data) {
    // alert('Row: ' + (data.rowIdx + 1) + ', Column: ' + (data.idx + 1));
  },
  render: function() {
    return (
      <ContextMenu>
        <MenuItem data={{rowIdx: this.props.rowIdx, idx: this.props.idx}} onClick={this.onItemClick}>{this.props.rowIdx},{this.props.idx}</MenuItem>
      </ContextMenu>
    );
  }
});

 var Component = React.createClass({displayName: 'component',

    getInitialState : function(){
      var fakeRows = FakeObjectDataStore.createRows(100);
      return {rows : Immutable.fromJS(fakeRows)};
    },

    handleRowUpdated : function(commit){
      //merge the updated row values with the existing row
      var newRows = this.state.rows.update(commit.rowIdx, function(r) {
        return r.merge(commit.updated);
      });
      this.setState({rows: newRows});
    },

    handleCellDrag : function(e){
        var rows = this.state.rows;
        for (var i = e.fromRow; i <= e.toRow; i++){
          rows = rows.update(i, function(r){
            return r.set(e.cellKey, e.value);
          });
        }
        if(this.props.handleCellDrag) {this.props.handleCellDrag(e)}
        this.setState({rows:rows});
    },

    handleCellCopyPaste : function(e){
      var rows = this.state.rows.update(e.toRow, function(r) {
        return r.set(e.cellKey, e.value);
      });
      this.setState({rows:rows});
    },

    handleAddRow : function(e){
      var newRow = {
        id: e.newRowIndex,
        userStory: '',
        developer : '',
        epic : ''};
        var rows = this.state.rows.push(newRow);
        this.setState({rows : rows});
    },

    getRowAt(index){
      if (index < 0 || index > this.getSize()){
        return undefined;
      }
      return this.state.rows.get(index);
    },

    getSize() {
      return this.state.rows.size;
    },

    render() {
      return (
            <ReactDataGrid
              contextMenu={<MyContextMenu />}
              ref='reactDataGrid'
              enableCellSelect={true}
              columns={columns}
              rowGetter={this.getRowAt}
              rowsCount={this.getSize()}
              onRowUpdated={this.handleRowUpdated}
              onCellsDragged={this.handleCellDrag}
              onCellCopyPaste={this.handleCellCopyPaste}
              toolbar={<Toolbar onAddRow={this.handleAddRow} onToggleFilter={()=>{}} numberOfRows={this.getSize()}/>}
              enableRowSelect={true}
              rowHeight={50}
              minHeight={600}
              />

      );
    }
  });

  if(typeof module !== 'undefined' && module.exports){
    module.exports = Component;
  }else{
    this.ReactDataGrid = Component;
  }

}).call(this);
