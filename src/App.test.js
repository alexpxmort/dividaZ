/**
 * Testes dos componentes usados
 * 
 */


import React from 'react';
import { shallow } from 'enzyme';

import Card from '../src/components/card';
import Spinner from './components/loading/loading.compont';
import Router from './routes/router.component';
import { Route } from 'react-router-dom';
import { InputCustom } from './components/input-custom';
import { Form } from '@unform/web';
import SelectCustom from './components/custom-select';
import { SpinnerContainer, SpinnerOverlay } from './components/with_spinner/with-spinner.styles';
import Search from './components/search';
import ModalConfirmDelete from './components/modal/modal_confirm';
import AddPage from './pages/add/index';
import EditPage from './pages/edit/index';
import ListPage from './pages/list/index';
import FormCustom from './components/form/divida.form';

describe('#components', () => {
  it('render the Card component', () => {
    const wrapper = shallow(<Card />);
   expect(wrapper).toMatchSnapshot();
  });

  it('render the Card component with props', () => {
    const _onClick = jest.fn();
    const wrapper = shallow(<Card onClick={_onClick}>
      {
        <h1>Ola</h1>
      }
    </Card>);

    expect(wrapper.children.length).toEqual(1);
    expect(wrapper.props().onClick).toEqual(_onClick);

  });

  it('render the Spinner component', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the InputCustom component', () => {
    const wrapper = shallow(<Form><InputCustom /></Form>);
    expect(wrapper).toMatchSnapshot();
  });

  it('render de SelectCustom component', () => {
    const options = [
      {
        value:1,
        name:'Alex',
        label:'Alex'
      },
      {
        value:2,
        name:'João',
        label:'João'
      }
    ];
    const wrapper = shallow(<Form>
          <SelectCustom disabled={false} required isSearchable  name={'teste'} placeholder={'Teste'} options={options}    />
    </Form>);
    
    expect(wrapper).toMatchSnapshot();
  });

  it('render SpinnerOverlay component', () => {
    const wrapper = shallow(<SpinnerOverlay/>);
    
    expect(wrapper).toMatchSnapshot();
  });

  it('render SpinnerContainer component', () => {
    const wrapper = shallow(<SpinnerContainer/>);
    
    expect(wrapper).toMatchSnapshot();
  });

  it('render Search component', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<Search onSubmit={onSubmit}/>);
    
    expect(wrapper).toMatchSnapshot();
  });

  it('render FormCustom component', () => {
    const options = [
      {
        value:1,
        name:'Alex',
        label:'Alex'
      },
      {
        value:2,
        name:'João',
        label:'João'
      }
    ];

    const _initialData = {
      cliente:null,
      motivo:'',
      valor:''
  };

    const _handleSubit = jest.fn();
    const wrapper = shallow(  <FormCustom  initialData={_initialData} handleSubmit={_handleSubit} options={options}/>);

    expect(wrapper.props().children.props.onSubmit).toBe(_handleSubit);
    expect(wrapper.props().children.props.initialData).toBe(_initialData);
    expect(wrapper.props().children.props.children.length).toBe(5);

    expect(wrapper).toMatchSnapshot();
  });

  it('render ModalConfirmDelete component', () => {
    const handleDelete = jest.fn();
    const open = true;
    const idDel = 1;
    const onClose  = jest.fn();
    const msg  = `Deseja mesmo deletar?`;

    const wrapper = shallow( <ModalConfirmDelete
      msg={msg}
      open={open}
      onClose={onClose}
      idDel={idDel}
      handleFuncYes={handleDelete}
      />);
     
    expect(wrapper).toMatchSnapshot();

  });
});


describe ('#pages', () => {
  it('renders the AddPage ',()=>{
    const onSuccess = jest.fn();
    const wrapper = shallow(<AddPage onSuccess={onSuccess} />);
    expect(wrapper).toMatchSnapshot();
  })

  it('renders the EditPage ',()=>{
    const onSuccess = jest.fn();
    const wrapper = shallow(<EditPage onSuccess={onSuccess} />);
    expect(wrapper).toMatchSnapshot();
  })

  it('renders the ListPage ',()=>{
    const wrapper = shallow(<ListPage/>);
    expect(wrapper).toMatchSnapshot();
  })
});

describe ('#routes', () => {
  it('renders correct routes', () => {
    const wrapper = shallow(<Router />);
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
  
    expect(pathMap['/']['displayName']).toBe('withRouter(ListPage)')
    expect(pathMap['/edit/:id']['displayName']).toBe('withRouter(ListPage)')
  });
});
