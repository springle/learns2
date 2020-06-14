import React from 'react';
import { connect } from 'react-redux';
import { Menu, MenuItem, Spinner } from '@blueprintjs/core';
import { ReplayUpload } from '../upload/ReplayUpload';
import { RootState } from '../../app/store';
import { Replay } from '../../store/replay/types';
import { store } from '../../app/store';
import { selectReplay } from '../../store/replay/actions';

interface Props {
    replays: Replay[];
    selected?: number;
}

const mapState = (root: RootState): Props => {
    return {
        replays: root.replay.replays,
        selected: root.replay.selected
    }
}

const SideBar = (props: Props) => {
    const items = props.replays.map((replay, idx) => {
        const onClick = () => { store.dispatch(selectReplay(replay.id)) }
        const isActive = props.selected === replay.id;
        const labelElement = <Spinner size={Spinner.SIZE_SMALL} />
        return <MenuItem key={idx} text={replay.name} active={isActive} onClick={onClick} labelElement={labelElement}/>
    })
    return (
        <Menu large={false} className='left-menu'>
            {items}
            <h4 className='bp3-heading'>Drop .SC2Replay file(s)</h4>
            <ReplayUpload />
        </Menu>
    )
}
export default connect(mapState)(SideBar)