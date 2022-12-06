
import { Button, Form, Icon, Input, Label, Menu, Modal, TextArea ,Popup} from "semantic-ui-react"

import { Component ,useState} from "react";
// function func1()
// 	{
// setOpen(o=>!o)
// 	}

const Channels = props => {
	const [val, setVal] = useState("Default input value");
	const [open, setOpen] = useState(false);
	const [verifypass,setverifypass]=useState('');
	const notify = () => toast("Wow so easy!");
	function func1()
	{
setOpen(o=>!o)
	}
	function func2()
	{
console.log(props)
	}
	function verifychannelkey()
	{
let fl=0;
props.channels.map(cha=>{
	if(cha.password==verifypass)
	{
		fl=1;
		props.setChannel(cha)
		func1();
	}
})
if(!fl)
{
	alert('Incorrect password')
}
// console.log(props);
// props.channels.map(chan)
// props.setChannel(chan)
 			
// 			else{
// 				console.log('act2')
// 			}
		
	}
	const closeModal = () => setOpen(false);
	const getNotifications = channel => {
		let count = 0;
		props.notifications.forEach(notification => {
			if (notification.id === channel.id) {
				count = notification.count
			}
		})
		if (count > 0) return count
	}
	
	const displayChannels = () => (
		(props.channels.length > 0) && (props.channels.map(channel => (
			<Menu.Item
				key={channel.id}
				name={channel.name}
				style={{ fontSize: '1.2rem', opacity: .7 }}
				// onClick={() =>{
				// 	setOpen(o => !o)
				// }
				// }
				onClick={() =>[func1(),func2()]}
				active={props.activeChannel === channel.id}>
				{getNotifications(channel) && (
					<Label color="red">{getNotifications(channel)}</Label>
				)}
				<span style={{ fontSize: '1.2rem' }}>#{channel.name}</span>
			</Menu.Item>
		))
		))

	return (
		<>
			<Menu.Menu className="menu">
				<Menu.Item>
					<span>
						<Icon name="exchange" /> CHANNELS
				</span>{" "}
				({props.channels.length})
				<Icon name="add circle" onClick={props.openModal} />
				</Menu.Item>

				{/* channels  list*/}
				{props.loadingChannels ? <p style={{ color: 'whitesmoke' }}>Loading...</p> : displayChannels()}

			</Menu.Menu>
			{/* NEW CHANNEL MODEL */}
			<Modal open={props.modal} onClose={props.closeModal} >
				<Modal.Header style={{ textAlign: 'center', fontSize: '2rem' }}>Add New Channel</Modal.Header>
				<Modal.Content>
					<Form onSubmit={props.submitNewForm}>
						<Form.Field>
							<Input
								fluid
								placeholder="name of Channel"
								name="channelName"
								onChange={props.changeInput} />
						</Form.Field>
						<Form.Field>
							<TextArea
								fluid
								placeholder="About the Channels"
								name="channelDesc"
								onChange={props.changeInput} />
						</Form.Field>
						<Form.Field>
							<TextArea
								placeholder="Set channel password"
								name="channelpassword"
								onChange={props.changeInput} />
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button color="green" inverted onClick={props.submitNewForm}>
						<Icon name="checkmark" />ADD
					</Button>
					<Button color="red" inverted onClick={props.closeModal}>
						<Icon name="remove" />CANCEL
					</Button>
				</Modal.Actions>
			</Modal>
			<Popup open={open} closeOnDocumentClick onClose={props.closeModal}>
			<Modal.Header style={{ textAlign: 'center', fontSize: '2rem' }}>Verify the channel Key</Modal.Header>
				<Modal.Content>
					<Form onSubmit={props.checkchannelkey}>
						<Form.Field>
							<Input
								fluid
								placeholder="Channel Key"
								name="channelkey"
								onChange={(e)=>{
									setverifypass(e.target.value)
								}} />
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button color="green" inverted onClick={verifychannelkey}>
						<Icon name="checkmark" />VERIFY
					</Button>
					<Button color="red" inverted onClick={closeModal}>
						<Icon name="remove" />CLOSE
					</Button>
				</Modal.Actions>
      </Popup>
		</>
	)
}

export default Channels;