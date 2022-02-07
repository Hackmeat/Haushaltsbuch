import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Nav() {

    const buttons = [
        <Button key="finance" href="/">Finance</Button>,
        <Button key="saving" href="/saving">Saving</Button>,
        <Button key="debts" href="/debts">Debts</Button>,
    ];

    return (
        <>
            <div id="navDiv">
                <ButtonGroup size="large" aria-label="large button group">
                    {buttons}
                </ButtonGroup>
            </div>
        </>
    );
}

export default Nav;