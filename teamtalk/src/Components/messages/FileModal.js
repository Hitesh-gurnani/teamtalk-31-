import { Button, Icon, Input, Modal } from "semantic-ui-react";

const fileModal = props => {
	return (
		<Modal basic open={props.modal} onClose={props.closeModal}>
			<Modal.Header>Select a File</Modal.Header>
			<Modal.Content>
				<Input
					onChange={props.addFile}
					fluid
					placholder="select a file"
					name="file"
					type="file"
                    accept=".png,.jpg,.jpeg"
					minFileSize={10000}
					maxFileSize={28400000}
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button
					color="green"
					inverted
					onClick={props.sendFile}
				>
					<Icon name="cloud upload" />SEND
				</Button>

				<Button
					color="red"
					inverted
					onClick={props.closeModal}
				>
					<Icon name="remove" />CANCEL
				</Button>
			</Modal.Actions>
		</Modal>
	)
}

export default fileModal;