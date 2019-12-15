import React, { Component, Fragment, PureComponent } from 'react';
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Steps,
  Table,
} from 'antd';
import moment from '../../List/TableList';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;

@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = () => {
    const test1 = document.getElementById('test1').value;
    const test2 = document.getElementById('test2').value;
    console.log(`test1:${test1},test2:${test2}`);
  };

  renderFooter = () => {};

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false, values)}
        onOk={this.handleNext}
        // afterClose={() => handleUpdateModalVisible}
      >
        <Row gutter={(16, 16)}>
          <Col>
            xxxxxx:
            <InputNumber id="test1" /> - <InputNumber id="test2" />
          </Col>
        </Row>
      </Modal>
    );
  }
}

class OptionTable extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    stepFormValues: {},
  };
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };
  columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      // render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '操作',
      render: (text, record, index) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
        </Fragment>
      ),
    },
  ];
  data = [
    {
      name: '测试1',
      callNo: '1',
    },
    {
      name: '测试2',
      callNo: '2',
    },
    {
      name: '测试3',
      callNo: '3',
    },
  ];
  render() {
    const { stepFormValues, updateModalVisible } = this.state;
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    return (
      <div>
        <Table columns={this.columns} dataSource={this.data} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </div>
    );
  }
}

export default OptionTable;
